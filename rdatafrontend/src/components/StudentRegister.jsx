// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import axios from "axios";
// import styles from '../styles/Auth.module.css'; // Import CSS module

// const StudentRegister = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [department, setDepartment] = useState('');
//   const [course, setCourse] = useState('');
//   const [error, setError] = useState(''); // State to handle error messages

//   const handleRegister = async (e) => {
//     e.preventDefault();
    
//     // Clear any previous error message
//     setError('');

//     // Create the student data object to send to the backend
//     const studentData = {
//       name,
//       email,
//       password,
//       department,
//       course
//     };

//     try {
//       // Send a POST request to the backend API to register the student
//       const response = await axios.post('http://localhost:5000/api/auth/register', studentData);

//       if (response.status === 201) {
//         // If registration is successful, navigate to the login page
//         navigate("/StudentLogin");
//       }
//     } catch (err) {
//       // Handle error and set the error message to show in the UI
//       console.error(err);
//       setError(err.response?.data?.message || 'Something went wrong');
//     }
//   };

//   return (
//     <div className={styles.authWrapper}>
//       <header className={styles.authHeader}>
//         <div className={styles.authLogo}>R.Data</div>
//       </header>

//       <main className={styles.authCard}>
//         <h2 className={styles.title}>Student Register</h2>
        
//         {error && <p className={styles.error}>{error}</p>} {/* Display error message if exists */}

//         <form onSubmit={handleRegister} className={styles.form}>
//           <label htmlFor="name" className={styles.label}>Name</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className={styles.input}
//             required
//             placeholder="Enter your full name"
//           />

//           <label htmlFor="email" className={styles.label}>Email (Tezu Only)</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className={styles.input}
//             required
//             placeholder="Enter your Tezu email"
//             pattern="^[a-zA-Z0-9._%+-]+@tezu\.edu\.in$" // Tezu email validation
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

//           <label htmlFor="department" className={styles.label}>Department</label>
//           <input
//             type="text"
//             id="department"
//             value={department}
//             onChange={(e) => setDepartment(e.target.value)}
//             className={styles.input}
//             required
//             placeholder="Enter your department"
//           />

//           <label htmlFor="course" className={styles.label}>Course</label>
//           <input
//             type="text"
//             id="course"
//             value={course}
//             onChange={(e) => setCourse(e.target.value)}
//             className={styles.input}
//             required
//             placeholder="Enter your course"
//           />

//           <button type="submit" className={styles.button}>Register</button>
//         </form>

//         <div className={styles.linkWrapper}>
//           <p>Already have an account?</p>
//           <a href="/StudentLogin" className={styles.link}>Login here</a>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default StudentRegister;

// 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";
import styles from '../styles/Auth.module.css'; // Import CSS module

const StudentRegister = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [course, setCourse] = useState('');
  const [error, setError] = useState(''); // State to handle error messages
  const [loading, setLoading] = useState(false); // Add loading state

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Clear any previous error message
    setError('');
    setLoading(true); // Set loading to true when submitting the form

    // Create the student data object to send to the backend
    const studentData = {
      name,
      email,
      password,
      department,
      course
    };

    try {
      // Send a POST request to the backend API to register the student
      const response = await axios.post('http://backend-domain.com/api/auth/register', studentData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Enable credentials to handle cookies (if needed)
      });

      if (response.status === 201) {
        // If registration is successful, navigate to the login page
        navigate("/StudentLogin");
      }
    } catch (err) {
      // Handle error and set the error message to show in the UI
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false); // Reset loading state after request completes
    }
  };

  return (
    <div className={styles.authWrapper}>
      <header className={styles.authHeader}>
        <div className={styles.authLogo}>R.Data</div>
      </header>

      <main className={styles.authCard}>
        <h2 className={styles.title}>Student Register</h2>
        
        {error && <p className={styles.error}>{error}</p>} {/* Display error message if exists */}

        <form onSubmit={handleRegister} className={styles.form}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
            placeholder="Enter your full name"
          />

          <label htmlFor="email" className={styles.label}>Email (Tezu Only)</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
            placeholder="Enter your Tezu email"
            pattern="^[a-zA-Z0-9._%+-]+@tezu\.edu\.in$" // Tezu email validation
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

          <label htmlFor="department" className={styles.label}>Department</label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className={styles.input}
            required
            placeholder="Enter your department"
          />

          <label htmlFor="course" className={styles.label}>Course</label>
          <input
            type="text"
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className={styles.input}
            required
            placeholder="Enter your course"
          />

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className={styles.linkWrapper}>
          <p>Already have an account?</p>
          <a href="/StudentLogin" className={styles.link}>Login here</a>
        </div>
      </main>
    </div>
  );
};

export default StudentRegister;



