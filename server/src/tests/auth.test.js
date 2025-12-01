import request from "supertest";
import App from "../server.js";
import db from "../config/db.js"


beforeEach(async () => {
  await db.query("DELETE from users WHERE email like '%@test.com'");
});

describe("Authentication system", () => {
  // run mutliple tests to test various functions

  it("1. should register a new user.", async () => {
    // send a mock/fake a http request to our server
    const res = await request(App)
      .post("/auth/register")
      .send({
        fname: "Zaki",
        lname: "Ayoubi",
        email: "zaki@test.com",
        password: "1234",
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain("registered");
  });

  it("2. should not allow duplicate email", async() => {
    // send a mock/fake http request to our server through the request function from supertest. 
    await request(App)
    .post("/auth/register")
    .send({
      fname: "zak",
      lname: "ayo",
      email: "zak@test.com",
      password: "1234",
    });

    const res = await request(App)
    .post("/auth/register")
    .send({
      fname: "cat",
      lname: "meow",
      email: "zak@test.com",
      password: "different",
    });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain("already exists");
  });

  it("3. should login with correct credentials", async () => {
    // send a mock request to our server hit the login endpoint and check the result

    // first we need to register a user
    await request(App)
      .post("/auth/register")
      .send({
        fname: "john", lname: "whitaker", email: "john@test.com", password: "123456"
      });

     // hit the login endpoint with user credentials 
    const res = await request(App)
      .post("/auth/login")
      .send({
        email: "john@test.com",
        password: "123456",
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  it("4. should reject wrong password", async () => {
    // register a user first
    await request(App)
      .post("/auth/register")
      .send({
        fname: "A",
        lname: "B",
        email: "wrong@test.com",
        password: "wrong",
      });
    
    const res = await request(App)
      .post("/auth/login")
      .send({
        password: "correct",
        email: "wrong@test.com",
      });

    expect(res.body.success).toBe(false)
  });

  it("5. should block protected route when not logged in", async() => {
    const res = await request(App).get("/api/todos");
    expect(res.status).toBe(401)
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain("Not authenticated")
  });

  it("6. should allow access when logged in", async () => {
    // first register a user
    await request(App)
      .post("/auth/register")
      .send({
        fname: "alejandro",
        lname: "ramos",
        email: "ale@test.com",
        password: "ale",
      });

    // login the user

    const agent = request.agent(App) // this request.agent remembers cookies. a browser that store session information
    await agent
      .post("/auth/login")
      .send({
        email: "ale@test.com",
        password: "ale"
      });

    // hit a api route to check if the user has access
    const res = await agent.get("/api/todos");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("todos");
    expect(Array.isArray(res.body.todos)).toBe(true);
  });

  it("7. should logout and block access again", async () => {
    const agent = request.agent(App);

    // Login
    await agent.post("/auth/register").send({
      fname: "Temp", lname: "User", email: "temp@test.com", password: "123"
    });
    await agent.post("/auth/login").send({ email: "temp@test.com", password: "123" });

    // Can access todos
    let res = await agent.get("/api/todos");
    expect(res.status).toBe(200);

    // Logout
    await agent.post("/auth/logout");

    // Now blocked again
    res = await agent.get("/api/todos");
    expect(res.status).toBe(401);
  });
});

