// import React from "react";
// import '../styles/b.css';

// const FacultyAdminLogin = () => {
//   return (
//     <main className="login-choice">
//       <h2>Select Login</h2>
//       <button onClick={() => (window.location.href = "/faculty-login")}>
//         Faculty Login
//       </button>
//       <button onClick={() => (window.location.href = "/admin-login")}>
//         Admin Login
//       </button>
//     </main>
//   );
// };

// export default FacultyAdminLogin;


// import React from "react";
// import styles from '../styles/Auth.module.css';

// const FacultyAdminLogin = () =>  {
//   const navigate = useNavigate(); // Initialize the navigate function

//   // Function to handle Faculty Login button click
//   const handleFacultyLogin = () => {
//     navigate("/faculty-login"); // Redirect to Faculty login page
//   };

//   // Function to handle Admin Login button click
//   const handleAdminLogin = () => {
//     navigate("/admin-login"); // Redirect to Admin login page
//   };

//   return (
//     <div className={styles.authWrapper}>
//       <header className={styles.authHeader}>
//         <div className={styles.authLogo}>R.Data</div>
//       </header>
      
//       <main className={styles.authCard}>
//         <h2 className={styles.title}>Select Login</h2>
//         <button className={styles.button} onClick={() => (window.location.href = "/faculty-login")}>
//           Faculty Login
//         </button>
//         <button className={styles.button} onClick={() => (window.location.href = "/admin-login")}>
//           Admin Login
//         </button>
//       </main>
//     </div>
//   );
// };

// export default FacultyAdminLogin;
// import React from "react";
// import styles from '../styles/Auth.module.css';
// import { useNavigate } from "react-router-dom"; // Import useNavigate hook

// const FacultyAdminLogin = () => {
//   const navigate = useNavigate(); // Initialize the navigate function

//   // Function to handle Faculty Login button click
//   const handleFacultyLogin = () => {
//     navigate("/faculty-login"); // Redirect to Faculty login page
//   };

//   // Function to handle Admin Login button click
//   const handleAdminLogin = () => {
//     navigate("/admin-login"); // Redirect to Admin login page
//   };

//   return (
//     <div className={styles.login-wrapper}>
//       <header>
//         <h1>Welcome to R.Data</h1>
//       </header>
//       <main>
//         <h2>Choose your Login Type</h2>
//         <div className={styles.button-container}>
//           <button onClick={handleFacultyLogin} className={styles.login-button}>
//             Faculty Login
//           </button>
//           <button onClick={handleAdminLogin} className={styles.login-button}>
//             Admin Login
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default FacultyAdminLogin;
// import React from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import styles from '../styles/Auth.module.css'; // Import CSS module

// const FacultyAdminLogin = () => {
//   const navigate = useNavigate(); // Initialize the navigate function

//   // Function to handle Faculty Login button click
//   const handleFacultyLogin = () => {
//     navigate("/faculty-login"); // Redirect to Faculty login page
//   };

//   // Function to handle Admin Login button click
//   const handleAdminLogin = () => {
//     navigate("/admin-login"); // Redirect to Admin login page
//   };

//   return (
//     <div className={styles.authWrapper}>
//       {/* Header section */}
//       <header className={styles.authHeader}>
//         <div className={styles.authLogo}>R.Data</div>
//       </header>
      
//       {/* Main content */}
//       <main className={styles.authCard}>
//         <h2 className={styles.title}>Select Login</h2>
        
//         {/* Faculty Login Button */}
//         <button 
//           className={styles.button} 
//           onClick={handleFacultyLogin}
//         >
//           Faculty Login
//         </button>
        
//         {/* Admin Login Button */}
//         <button 
//           className={styles.button} 
//           onClick={handleAdminLogin}
//         >
//           Admin Login
//         </button>
//       </main>
//     </div>
//   );
// };

// export default FacultyAdminLogin;
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import styles from '../styles/Auth.module.css'; // Import CSS module

const FacultyAdminLogin = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle Faculty Login button click
  const handleFacultyLogin = () => {
    navigate("/FacultyLogin"); // Redirect to Faculty login page
  };

  // Function to handle Admin Login button click
  const handleAdminLogin = () => {
    navigate("/AdminLogin"); // Redirect to Admin login page
  };

  return (
    <div className={styles.authWrapper}>
      {/* Header section */}
      <header className={styles.authHeader}>
        <div className={styles.authLogo}>R.Data</div>
      </header>
      
      {/* Main content */}
      <main className={styles.authCard}>
        <h2 className={styles.title}>Select Login</h2>
        
        {/* Faculty Login Button */}
        <button 
          className={styles.button} 
          onClick={handleFacultyLogin}
        >
          Faculty Login
        </button>
        
        {/* Admin Login Button */}
        <button 
          className={styles.button} 
          onClick={handleAdminLogin}
        >
          Admin Login
        </button>
      </main>
    </div>
  );
};

export default FacultyAdminLogin;

