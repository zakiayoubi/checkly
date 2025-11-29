// import { useState } from 'react';
// import AddTaskIcon from '@mui/icons-material/AddTask';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { useNavigate } from 'react-router-dom';

// function Header() {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await fetch("http://localhost:3000/logout", {
//       method: "POST",
//       credentials: "include",
//     });
//     setOpen(false);
//     navigate("/");
//   };

//   return (
//     <header>
//       <div>
//         <AddTaskIcon />
//         <h1>Checkly</h1>
//       </div>

//       <div>
//         <button onClick={() => setOpen(!open)}>
//           <AccountCircleIcon />
//         </button>

//         {open && (
//           <div>
//             <button onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

// export default Header;

import { useState } from 'react';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css'; 

function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setOpen(false);
    navigate("/");
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