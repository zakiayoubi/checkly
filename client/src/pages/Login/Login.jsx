// import { useState } from "react";
// import {useNavigate} from "react-router-dom"
// import CustomInput from "../components/CustomInput";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// function Login() {
//   const navigate = useNavigate()
//   const [input, setInput] = useState({email: "", password: ""})
  
//   const email = input.email
//   const password = input.password

//   function handleChange(event) {
//     const {name, value} = event.target
//     setInput((prevValues) => {
//       return (
//         {...prevValues, [name]: value}
//       )
//     })
//   }

//   async function handleSubmit(event) {
//     event.preventDefault()
//     const response = await fetch("http://localhost:3000/login", {
//       method: "POST",
//       headers: {"content-type": "application/json"},
//       body: JSON.stringify({email, password}),
//       credentials: "include"
//     })

//     const data = await response.json();
//     if (data.success) {
//       navigate("/todos")
//     } else {
//       alert(data.message)
//     }

//   }

//   return (
//     <div className="container">
//       <Header />
//       <form onSubmit={handleSubmit}>
//         <CustomInput
//         type="text"
//         name="email"
//         placeholder="email"
//         value={input.email}
//         onChange={handleChange}
//         />

//         <CustomInput
//           type="password"
//           name="password"
//           value={input.password}
//           placeholder="password"
//           onChange={handleChange}
//         />

//         <button type="submit" className="btn">Login</button>
//       </form>
//       <Footer />
//     </div>
    
//   );
// }

// export default Login;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput/CustomInput";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./Login.module.css";   // ← NEW

function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: "", password: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: input.email, password: input.password }),
      credentials: "include"
    });

    const data = await response.json();
    if (data.success) {
      navigate("/todos");
    } else {
      alert(data.message);
    }
  }

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.loginWrapper}>
        <div className={styles.card}>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Log in to your tasks</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <CustomInput
              type="text"
              name="email"
              placeholder="you@example.com"
              value={input.email}
              onChange={handleChange}
            />
            <CustomInput
              type="password"
              name="password"
              placeholder="••••••••"
              value={input.password}
              onChange={handleChange}
            />

            <button type="submit" className={styles.submitBtn}>
              Login
            </button>
          </form>

          <p className={styles.footerText}>
            Don't have an account?{' '}
            <a href="/register" className={styles.link}>Sign up</a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;