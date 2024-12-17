import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import StudentLogin from "./components/StudentLogin"; // Corrected import for student login
import StudentRegister from "./components/StudentRegister";
import FacultyAdminLogin from "./components/FacultyAdminLogin";
import FacultyDashboard from "./components/FacultyDashboard"; // Import new dashboard component
import StudentDashboard from "./components/StudentDashboard"; // Import new student dashboard
import AdminDashboard from "./components/AdminDashboard"; // Import admin dashboard
import AdminLogin from "./components/AdminLogin";
import FacultyLogin from "./components/FacultyLogin";
import CreateFacultyAccount from "./components/CreateFacultyAccount";
import './styles/shared.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studentlogin" element={<StudentLogin />} /> {/* Corrected the route */}
        <Route path="/facultyadminlogin" element={<FacultyAdminLogin />} />
        <Route path="/studentregister" element={<StudentRegister />} />
        <Route path="/facultydashboard" element={<FacultyDashboard />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/facultylogin" element={<FacultyLogin />} />
        <Route path="/createfacultyaccount" element={<CreateFacultyAccount />} />
      </Routes>
    </Router>
  );
};

export default App;
