// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import styles from '../styles/Auth.module.css'; // Import CSS module
// import axios from 'axios';

// const StudentLogin = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();
    
//     // Add login logic here (e.g., API call to authenticate)
//     // Assuming login is successful:
//     navigate("/StudentDashboard");
//   };

//   try {
//     const response = await axios.post('http://localhost:5000/login', { email, password });
    
//     if (response.data.success) {
//       // Redirect or show success message
//     } else {
//       setError(response.data.message);
//     }
//   } catch (err) {
//     setError('Login failed. Please try again.');
//   }
// };

//   return (
//     <div className={styles.authWrapper}>
//       <header className={styles.authHeader}>
//         <div className={styles.authLogo}>R.Data</div>
//       </header>

//       <main className={styles.authCard}>
//         <h2 className={styles.title}>Student Login</h2>
        
//         <form onSubmit={handleLogin} className={styles.form}>
//           <label htmlFor="email" className={styles.label}>Email (Tezu Only)</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className={styles.input}
//             required
//             placeholder="Enter your Tezu email"
//           />

//           <label htmlFor="password" className={styles.label}>Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className={styles.input}
//             required
//             placeholder="Enter your password"
//           />

//           <button type="submit" className={styles.button}>Login</button>
//         </form>

//         <div className={styles.linkWrapper}>
//           <p>Don't have an account?</p>
//           <a href="/StudentRegister" className={styles.link}>Register here</a>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default StudentLogin;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import styles from '../styles/Auth.module.css'; // Import CSS module
import axios from 'axios';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to manage error messages

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Attempt login via API
    try {
      const response = await axios.post('http://localhost:5000/api/Stlogin/login', { email, password });
      console.log("api call hoise");
      
      if (response.data.message === "Login successful") {
        // If login is successful, navigate to the student dashboard
        console.log("yaat paisu", response.data);
        // Store the token in localStorage
        console.log("apna token", response.data.token);
        localStorage.setItem("token", response.data.token);  // Save the token
        navigate("/studentdashboard");
      } else {
        // If login fails, display the error message from the server
        setError(response.data.message);
      }
    } catch (err) {
      // Handle any network or server errors
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className={styles.authWrapper}>
      <header className={styles.authHeader}>
        <div className={styles.authLogo}>R.Data</div>
      </header>

      <main className={styles.authCard}>
        <h2 className={styles.title}>Student Login</h2>
        
        {error && <div className={styles.error}>{error}</div>} {/* Display error message if any */}

        <form onSubmit={handleLogin} className={styles.form}>
          <label htmlFor="email" className={styles.label}>Email (Tezu Only)</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
            placeholder="Enter your Tezu email"
          />

          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
            placeholder="Enter your password"
          />

          <button type="submit" className={styles.button}>Login</button>
        </form>

        <div className={styles.linkWrapper}>
          <p>Don't have an account?</p>
          <a href="/StudentRegister" className={styles.link}>Register here</a>
        </div>
      </main>
    </div>
  );
};

export default StudentLogin;

