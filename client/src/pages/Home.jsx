import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '@mui/material/Button';


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
    <div className='home'>
      <Header />
      <h1>Welcome to Checkly. Use Login or Sign up</h1>
      <div>
        <Button onClick={handleClick} name="login" type="submit" variant="contained">Login</Button>
      </div>
      <Button onClick={handleClick} name="register" type="submit" variant="contained">Register</Button>
      <Footer />
    </div>
  )
}

export default Home;
