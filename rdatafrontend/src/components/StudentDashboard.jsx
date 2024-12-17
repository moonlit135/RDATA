import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import styles from '../styles/Dashboard.module.css'; // Import CSS module for dashboard styling

const StudentDashboard = () => {
  const navigate = useNavigate();

  // States to hold student details
  const [student, setStudent] = useState({
    name: "",
    email: "",
    department: "",
    course: "",
  });

  const [newPassword, setNewPassword] = useState('');
  const [newDepartment, setNewDepartment] = useState(student.department);
  const [newCourse, setNewCourse] = useState(student.course);

  // State for files
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch student data from the backend/API (mocked data for now)
    // Ideally, you'd call an API to get the student data after login
    fetchStudentData();
  }, []);

  // Fetch student data from backend
  const fetchStudentData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/student/dashboard", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Make sure the token is stored in localStorage or cookies
        },
    });

    const data = await response.json();
      if (response.ok) {
        setStudent(data.student); // Update state with student data
      } else {
        console.error(data.message || "Failed to fetch student data");
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    }

    // Mocking file data
    setFiles([
      { name: "File 1 (PDF)", type: "pdf", link: "#" },
      { name: "File 2 (Excel)", type: "excel", link: "#" },
      { name: "File 3 (Graph)", type: "graph", link: "#" },
    ]);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/StudentLogin"); // Navigate to login page
  };

  // Handle password update
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    // Here you would typically call an API to update the password
    alert("Password updated successfully");
    setNewPassword('');
  };

  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Here you would typically call an API to update the profile
    alert("Profile updated successfully");
    setNewDepartment(newDepartment);
    setNewCourse(newCourse);
  };

  // Handle file download (mock function for now)
  const handleDownload = (fileName) => {
    alert(`Downloading ${fileName}`);
    // Implement the actual file download logic here
  };

  return (
    <div className={styles.dashboardWrapper}>
      <header className={styles.dashboardHeader}>
        <div className={styles.dashboardLogo}>R.Data</div>
        <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </header>

      <main className={styles.dashboardCard}>
        <h2 className={styles.title}>Student Dashboard</h2>
        
        {/* Display Student Info */}
        <div className={styles.profile}>
          <h3>Profile Information</h3>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Department:</strong> {student.department}</p>
          <p><strong>Course:</strong> {student.course}</p>
        </div>

        {/* Update Password */}
        <form onSubmit={handlePasswordUpdate} className={styles.form}>
          <h3>Update Password</h3>
          <input
            type="password"
            placeholder="New Password"
            className={styles.input}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.button}>Update Password</button>
        </form>

        {/* Update Profile */}
        <form onSubmit={handleProfileUpdate} className={styles.form}>
          <h3>Update Profile</h3>
          <label htmlFor="department" className={styles.label}>Department</label>
          <input
            type="text"
            id="department"
            className={styles.input}
            value={newDepartment}
            onChange={(e) => setNewDepartment(e.target.value)}
            required
          />
          
          <label htmlFor="course" className={styles.label}>Course</label>
          <input
            type="text"
            id="course"
            className={styles.input}
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
            required
          />

          <button type="submit" className={styles.button}>Update Profile</button>
        </form>

        {/* File Management Section (Read/Download Files) */}
        <div className={styles.filesSection}>
          <h3>Uploaded Files</h3>
          <p>You can only view and download files.</p>
          {/* Display list of files */}
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                <span>{file.name}</span>
                <button className={styles.button} onClick={() => handleDownload(file.name)}>
                  Download
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;


