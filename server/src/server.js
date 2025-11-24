import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import pg from "pg";
import dotenv from "dotenv";
import passport from "passport";
const { deserializeUser, serializeUser } = passport;
import {Strategy} from "passport-local";
import session from "express-session";

dotenv.config({ path: "../../.env" });
const app = express();
const port = process.env.SERVERPORT
const saltRounds = 10;


// Allow localhost:5173 to talk to backend
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(
  session({
    name: "sid", // cookie name; optional
    secret: process.env.SESSION_SECRET,
    resave: false, // don't save if unmodified
    saveUninitialized: false, // don't create empty sessions
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 // one hour
    }
  })
)

app.use(passport.initialize());
app.use(passport.session());


const db = new pg.Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.DATABASEPASSWORD,
  port: process.env.DATABASEPORT
})

db.connect()
  .then(()=> {
    console.log("Connected to the database")
  }) 
  .catch(()=> {
    console.log("Failed to connect to the database.")
  })

// ----- API ROUTES -----

app.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;
  console.log(fname, lname, email, password)

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (checkResult.rows.length > 0) {
      res.json({
        success: false,
        message: "Email already exists."
      })
    } else {
      // hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log("Error hashing the password: ", err)
        } else {
          console.log("Hashed password: ", hash)
          await db.query("INSERT INTO users(fname, lname, email, password) VALUES ($1, $2, $3, $4)",
          [fname, lname, email, hash])
          res.json({
            success: true,
            message: "user successfully registered."
          })
        }
      })
    }
  } catch (err) {
    console.log(err)
  } 
});

app.post("/login", async (req, res, next) => {
  passport.authenticate("local", async(err, user) => {
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        message: "Server error"})
    }
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid email or password"})
    }
    await req.logIn(user, (err) => {
      if (err) {
        return res.json({message: "Login failed"})
      }

      return res.json({
        success: true,
        message: "Login successful"
      })
    })
  }) (req, res, next);
});

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    // Destroy the session cookie
    req.session.destroy(() => {
      res.clearCookie("sid"); // cookie name from your session settings
      res.json({ message: "Logged out successfully" });
    });
  });
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // user is logged in → allow access
  }
  res.status(401).json({ message: "Not authenticated" });
}


app.get("/", async (req, res) => {
  res.json({ message: "home page"});

});


app.get("/todos", ensureAuthenticated, async(req, res) => {
  const result = await db.query("SELECT * FROM todos WHERE user_id = $1", [req.user.id])
  const output = result.rows
  res.json({ todos:  output});

})

app.post("/todos", ensureAuthenticated, async(req, res) => {
  const {priority, title, description} = req.body.task
  console.log(priority, title, description)
  try {
    const result = await db.query(
      "INSERT INTO todos (user_id, priority, title, description) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.user.id, priority, title, description]
    )
    console.log(result.rows)
    if (result.rowCount === 1) {
      res.json({success: true, message: "Task added."})
    }

  } catch (err) {
    console.log(err)
  }
})

app.put("/todos", ensureAuthenticated, async(req, res) => {
  const {completed, 
        priority,
        taskId, 
        title, 
        description } = req.body.updatedTask


  const updates = []
  const values = []
  let paramCount = 1

  if (title !== undefined) {updates.push(`title = $${paramCount++}`); console.log(paramCount); values.push(title)} 
  if (description !== undefined) {updates.push(`description = $${paramCount++}`);console.log(paramCount); values.push(description)}
  if (priority !== undefined) {updates.push(`priority = $${paramCount++}`); console.log(paramCount); values.push(priority)}
  if (completed !== undefined) {updates.push(`completed = $${paramCount++}`); values.push(completed)}

  values.push(taskId)

  const query = `UPDATE todos set ${updates.join(", ")} WHERE id = $${paramCount} AND user_id = $${paramCount + 1} RETURNING *`

  const result = await db.query(query, [...values, req.user.id])
})


app.delete("/todos", ensureAuthenticated, async(req, res) => {
  const taskId = req.body.taskId
  try {
    const result = await db.query(
    "DELETE from todos WHERE id = $1 returning *", [taskId]
    )
    if (result.rowCount === 0) {
      return res.status(404).json({sucess: false, message: "Task not found"})
    }

    res.json({sucess: true, message: "Task deleted"})
  }

  catch (err) {
    console.log(err)
  }
  
})


// ----------------------
passport.use(
  "local",
  new Strategy({ usernameField: "email", passwordField: "password" },
    async function verify(email, password, cb) {
      try {
        const result = await db.query(
          "SELECT * FROM users WHERE email = $1",
          [email]
        );

        if (result.rows.length === 0) {
          // email not found
          return cb(null, false);
        }

        const user = result.rows[0];

        bcrypt.compare(password, user.password, (err, match) => {
          if (err) {
            return cb(err);
          }

          if (!match) {
            return cb(null, false); // incorrect password
          }

          return cb(null, user); // success!
        });
      } catch (err) {
        return cb(err);
      }
    }
  )
);

// Save user to session
passport.serializeUser((user, cb) => {
  cb(null, user.id); // store only the ID
});

// Retrieve user from session
passport.deserializeUser(async (id, cb) => {
  try {
    const result = await db.query(
      "SELECT id, fname, lname, email FROM users WHERE id=$1",
      [id]
    );
    cb(null, result.rows[0]);
  } catch (err) {
    cb(err);
  }
});


app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
