import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import styles from './Home.module.css'

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
    <div className={styles.home}>
      <Header />
      
      <main className={styles.homeWrapper}>
        <h1 className={styles.title}>Welcome to Checkly</h1>
        <p className={styles.subtitle}>
          Simple, beautiful task management for teams and individuals.
        </p>

        <div className={styles.buttonGroup}>
          <button
            onClick={handleClick}
            name="login"
            className={`${styles.btn} ${styles.btnLogin}`}
          >
            Login
          </button>

          <button
            onClick={handleClick}
            name="register"
            className={`${styles.btn} ${styles.btnRegister}`}
          >
            Register
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home;