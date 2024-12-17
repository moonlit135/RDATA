import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import styles from '../styles/Auth.module.css'; // Assuming CSS module is the same

const CreateFacultyAccount = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the email to ensure it is a Tezu email
    if (!email.endsWith('@tezu.edu.in')) {
      setError('Please enter a valid Tezu email address');
      return;
    }

    const facultyData = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch('/api/admin/create-faculty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(facultyData),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/admin-dashboard'); // Redirect to admin dashboard after successful creation
      } else {
        setError(data.message || 'Failed to create faculty account');
      }
    } catch (error) {
      setError('An error occurred, please try again');
    }
  };

  return (
    <div className={styles.authWrapper}>
      <header className={styles.authHeader}>
        <div className={styles.authLogo}>R.Data</div>
      </header>

      <main className={styles.authCard}>
        <h2 className={styles.title}>Create Faculty Account</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label className={styles.label}>Name</label>
            <input
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className={styles.label}>Tezu Email</label>
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.button}>
            Create Account
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateFacultyAccount;
