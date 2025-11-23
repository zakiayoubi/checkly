import { useNavigate } from 'react-router-dom'

// future improvement:
// create a sample inpuArea and sample todos for users to interact with. 
function Home() {

  const navigate = useNavigate()

  function handleClick(event) {
    if (event.target.name === "login") {
      navigate("/login")
    } else {
      navigate("/register")
    }
  }
  return (
    <div>
      <h1>Welcome to Checkly. Use Login or Sign up</h1>
      <button onClick={handleClick} name="login" type="submit">Login</button>
      <button onClick={handleClick} name="register" type="submit">Register</button>
    </div>
  )
}

export default Home;
