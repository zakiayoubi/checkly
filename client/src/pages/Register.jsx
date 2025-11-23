import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";

function Register() {
  const navigate = useNavigate()
  const [input, setInput] = useState({fname: "", lname: "", email: "", password: ""})

  const email = input.email
  const password = input.password
  const fname = input.fname
  const lname = input.lname

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
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({fname, lname, email, password}),
      credentials: "include"
    })

    const data = await response.json();
    console.log(data)

    if (data.success) {
      navigate("/todos")
    } else {
      alert(data.message)
      navigate("/login")
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <CustomInput
      type="text"
      name="fname"
      placeholder="first name"
      value={input.fname}
      onChange={handleChange}
      />
      <CustomInput
      type="text"
      name="lname"
      placeholder="last name"
      value={input.lname}
      onChange={handleChange}
      />
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

      <button type="submit">Register</button>
    </form>
  );
}

export default Register;