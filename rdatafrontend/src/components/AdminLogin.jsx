import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/Auth.module.css'; // Import CSS module

const AdminLogin = () => {
  const navigate = useNavigate();
  
  // States to hold input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Assuming you have a backend that validates the admin credentials
    // Here, we check for hardcoded email and password for demo purposes
    if (email === "admin@tezu.edu.in" && password === "admin123") {
      alert("Admin logged in successfully!");
      navigate("/AdminDashboard"); // Redirect to admin dashboard after successful login
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className={styles.authWrapper}>
      {/* Header section */}
      <header className={styles.authHeader}>
        <div className={styles.authLogo}>R.Data</div>
      </header>
      
      {/* Main content */}
      <main className={styles.authCard}>
        <h2 className={styles.title}>Admin Login</h2>
        
        {/* Login form */}
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </main>
    </div>
  );
};

export default AdminLogin;


