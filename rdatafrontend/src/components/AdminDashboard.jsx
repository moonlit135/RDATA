import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import styles from '../styles/Dashboard.module.css'; // Import CSS module for dashboard styling

const AdminDashboard = () => {
  const navigate = useNavigate();

  // States to hold admin details
  const [admin, setAdmin] = useState({
    name: "Admin User",
    email: "admin@tezu.edu.in",
  });

  const [newPassword, setNewPassword] = useState('');
  const [newName, setNewName] = useState(admin.name);

  // States for managing faculty and student accounts
  const [facultyAccounts, setFacultyAccounts] = useState([]);
  const [studentAccounts, setStudentAccounts] = useState([]);

  // State for files
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch admin data and accounts from the backend/API (mocked data for now)
    fetchAdminData();
    fetchFacultyAccounts();
    fetchStudentAccounts();
    fetchUploadedFiles();
  }, []);

  // Mock functions to simulate API calls
  const fetchAdminData = () => {
    setAdmin({
      name: "Admin User",
      email: "admin@tezu.edu.in",
    });
  };

  const fetchFacultyAccounts = () => {
    setFacultyAccounts([
      { name: "Dr. Jane Smith", email: "janesmith@tezu.edu.in" },
      { name: "Prof. John Doe", email: "johndoe@tezu.edu.in" },
    ]);
  };

  const fetchStudentAccounts = () => {
    setStudentAccounts([
      { name: "Student A", email: "studenta@tezu.edu.in" },
      { name: "Student B", email: "studentb@tezu.edu.in" },
    ]);
  };

  const fetchUploadedFiles = () => {
    setFiles([
      { name: "File 1 (PDF)", type: "pdf", link: "#" },
      { name: "File 2 (Excel)", type: "excel", link: "#" },
      { name: "File 3 (Graph)", type: "graph", link: "#" },
    ]);
  };

  // Handle logout
  const handleLogout = () => {
    // Clear session and navigate to login page
    navigate("/admin-login");
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
    setNewName(newName);
  };

  // Handle faculty and student account creation and deletion
  const handleCreateAccount = (type) => {
    // Here, you'll prompt for new account creation
    alert(`Create new ${type} account`);
    // Add logic to call API for creating new account
  };

  const handleDeleteAccount = (email, type) => {
    alert(`Deleting ${type} account with email: ${email}`);
    // Add logic to call API for deleting account
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    e.preventDefault();
    // Here you would typically call an API to upload a file
    alert("File uploaded successfully");
  };

  // Handle file download
  const handleDownload = (fileName) => {
    alert(`Downloading ${fileName}`);
    // Implement the actual file download logic here
  };

  // Handle file delete
  const handleFileDelete = (fileName) => {
    alert(`Deleting ${fileName}`);
    // Implement the actual file deletion logic here
  };

  return (
    <div className={styles.dashboardWrapper}>
      <header className={styles.dashboardHeader}>
        <div className={styles.dashboardLogo}>R.Data</div>
        <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </header>

      <main className={styles.dashboardCard}>
        <h2 className={styles.title}>Admin Dashboard</h2>
        
        {/* Display Admin Info */}
        <div className={styles.profile}>
          <h3>Profile Information</h3>
          <p><strong>Name:</strong> {admin.name}</p>
          <p><strong>Email:</strong> {admin.email}</p>
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
          <label htmlFor="name" className={styles.label}>Name</label>
          <input
            type="text"
            id="name"
            className={styles.input}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
          <button type="submit" className={styles.button}>Update Profile</button>
        </form>

        {/* Manage Faculty Accounts */}
        <div className={styles.accountsSection}>
          <h3>Manage Faculty Accounts</h3>
          <button className={styles.button} onClick={() => handleCreateAccount('faculty')}>Create New Faculty Account</button>
          <h4>Faculty List</h4>
          <ul>
            {facultyAccounts.map((faculty, index) => (
              <li key={index}>
                <span>{faculty.name} ({faculty.email})</span>
                <button className={styles.button} onClick={() => handleDeleteAccount(faculty.email, 'faculty')}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Manage Student Accounts */}
        <div className={styles.accountsSection}>
          <h3>Manage Student Accounts</h3>
          <button className={styles.button} onClick={() => handleCreateAccount('student')}>Create New Student Account</button>
          <h4>Student List</h4>
          <ul>
            {studentAccounts.map((student, index) => (
              <li key={index}>
                <span>{student.name} ({student.email})</span>
                <button className={styles.button} onClick={() => handleDeleteAccount(student.email, 'student')}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        {/* File Management Section (Upload, Update, Delete, Download Files) */}
        <div className={styles.filesSection}>
          <h3>Manage Files</h3>
          <p>You can upload, update, delete, and download files.</p>

          {/* File Upload Form */}
          <form onSubmit={handleFileUpload} className={styles.form}>
            <label htmlFor="fileUpload" className={styles.label}>Upload New File</label>
            <input type="file" id="fileUpload" className={styles.input} required />
            <button type="submit" className={styles.button}>Upload File</button>
          </form>

          {/* Display list of files */}
          <h4>Uploaded Files</h4>
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                <span>{file.name}</span>
                <button className={styles.button} onClick={() => handleDownload(file.name)}>Download</button>
                <button className={styles.button} onClick={() => handleFileDelete(file.name)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

