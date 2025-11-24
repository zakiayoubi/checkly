import { useState } from "react";
import {useNavigate} from "react-router-dom"
import CustomInput from "../components/CustomInput";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Login() {
  const navigate = useNavigate()
  const [input, setInput] = useState({email: "", password: ""})
  
  const email = input.email
  const password = input.password

  function handleChange(event) {
    const {name, value} = event.target
    setInput((prevValues) => {
      return (
        {...prevValues, [name]: value}
      )
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({email, password}),
      credentials: "include"
    })

    const data = await response.json();
    if (data.success) {
      navigate("/todos")
    } else {
      alert(data.message)
    }

  }

  return (
    <div>
      <Header />
        <form onSubmit={handleSubmit}>
          <CustomInput
          type="text"
          name="email"
          placeholder="email"
          value={input.email}
          onChange={handleChange}
          />

          <CustomInput
            type="password"
            name="password"
            value={input.password}
            placeholder="password"
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>
      <Footer />
    </div>
    
  );
}

export default Login;