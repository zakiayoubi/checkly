
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput/CustomInput";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styles from "./Register.module.css";

function Register() {
  const navigate = useNavigate();
  const [input, setInput] = useState({ fname: "", lname: "", email: "", password: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setInput(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
      credentials: "include",
    });

    const data = await response.json();
    if (data.success) {
      navigate("/todos");
    } else {
      alert(data.message);
      navigate("/login");
    }
  }

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.formWrapper}>
        <div className={styles.card}>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Join Checkly and get organized</p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <CustomInput type="text"     name="fname"    placeholder="First name"  value={input.fname}    onChange={handleChange} />
            <CustomInput type="text"     name="lname"    placeholder="Last name"   value={input.lname}    onChange={handleChange} />
            <CustomInput type="email"    name="email"    placeholder="Email"       value={input.email}    onChange={handleChange} />
            <CustomInput type="password" name="password" placeholder="Password"    value={input.password} onChange={handleChange} />

            <button type="submit" className={styles.submitBtn}>
              Register
            </button>
          </form>

          <p className={styles.footerText}>
            Already have an account?{' '}
            <a href="/login" className={styles.link}>Log in</a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Register;