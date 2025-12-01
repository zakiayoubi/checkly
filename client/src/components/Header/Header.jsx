import { useState } from 'react';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css'; 

function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
      });

      const data = await res.json()
      if (!res.ok || !data.success) {
        console.error("Log out failed.", data.message || res.status )
        alert("Log out failed. Please try again!")
        return
      } 

      setOpen(false);
      navigate("/");
    } catch (err) {
    // Network down, server dead, CORS error, etc.
    console.error("Logout network error:", err);
    alert("No internet connection. You might still be logged in.");
  }
    
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <AddTaskIcon className={styles.headerIcon} />
        <h1 className={styles.headerTitle}>Checkly</h1>
      </div>

      <div className={styles.headerRight}>
        <button 
          onClick={() => setOpen(!open)} 
          className={styles.headerAvatarBtn}
          aria-label="User menu"
        >
          <AccountCircleIcon className={styles.headerAvatarIcon} />
        </button>

        {open && (
          <div className={styles.headerDropdown}>
            <button onClick={handleLogout} className={styles.headerLogoutBtn}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;