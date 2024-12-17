import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import styles from '../styles/Dashboard.module.css'; // Import CSS module for dashboard styling

const FacultyDashboard = () => {
  const navigate = useNavigate();

  // States to hold faculty details
  const [faculty, setFaculty] = useState({
    name: "Dr. Jane Smith",
    email: "janesmith@tezu.edu.in",
    department: "Computer Science",
    course: "MCA",
    specialization: "AI and Machine Learning",
  });

  const [newPassword, setNewPassword] = useState('');
  const [newDepartment, setNewDepartment] = useState(faculty.department);
  const [newCourse, setNewCourse] = useState(faculty.course);
  const [newSpecialization, setNewSpecialization] = useState(faculty.specialization);

  // State for files
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch faculty data from the backend/API (mocked data for now)
    fetchFacultyData();
  }, []);

  // Mock function to simulate API call for fetching faculty data
  const fetchFacultyData = () => {
    // Replace this with actual API call to fetch faculty data
    // Example: fetchFacultyDataFromAPI();
    setFaculty({
      name: "Dr. Jane Smith",
      email: "janesmith@tezu.edu.in",
      department: "Computer Science",
      course: "MCA",
      specialization: "AI and Machine Learning",
    });

    // Mocking file data
    setFiles([
      { name: "File 1 (PDF)", type: "pdf", link: "#" },
      { name: "File 2 (Excel)", type: "excel", link: "#" },
      { name: "File 3 (Graph)", type: "graph", link: "#" },
    ]);
  };

  // Handle logout
  const handleLogout = () => {
    // Clear session and navigate to login page
    navigate("/faculty-login");
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
    setNewSpecialization(newSpecialization);
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    e.preventDefault();
    // Here you would typically call an API to upload a file
    alert("File uploaded successfully");
  };

  // Handle file download (mock function for now)
  const handleDownload = (fileName) => {
    alert(`Downloading ${fileName}`);
    // Implement the actual file download logic here
  };

  // Handle file delete (mock function for now)
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
        <h2 className={styles.title}>Faculty Dashboard</h2>
        
        {/* Display Faculty Info */}
        <div className={styles.profile}>
          <h3>Profile Information</h3>
          <p><strong>Name:</strong> {faculty.name}</p>
          <p><strong>Email:</strong> {faculty.email}</p>
          <p><strong>Department:</strong> {faculty.department}</p>
          <p><strong>Course:</strong> {faculty.course}</p>
          <p><strong>Specialization:</strong> {faculty.specialization}</p>
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

          <label htmlFor="specialization" className={styles.label}>Specialization</label>
          <input
            type="text"
            id="specialization"
            className={styles.input}
            value={newSpecialization}
            onChange={(e) => setNewSpecialization(e.target.value)}
            required
          />

          <button type="submit" className={styles.button}>Update Profile</button>
        </form>

        {/* File Management Section (Upload, Update, Delete, Download Files) */}
        <div className={styles.filesSection}>
          <h3>Manage Files</h3>
          <p>You can upload, update, delete, and download your files.</p>

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

export default FacultyDashboard;

