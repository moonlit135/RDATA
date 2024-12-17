const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const Student = require("../models/Student");
const authMiddleware = require("../middleware/authMiddleware"); // Ensure this file exists
const express = require('express');


const router = express.Router();

// Enable CORS to allow requests from the frontend domain
const allowedOrigins = [
  "http://localhost:3000", // Replace with your actual frontend domain
];

router.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Register a student
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, department, course } = req.body;
    if (!email.endsWith("@tezu.ac.in")) {
      return res.status(400).json({ message: "Email must be a Tezu email." });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({ name, email, password: hashedPassword, department, course });
    await newStudent.save();
    res.status(201).json({ message: "Student registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Student login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the student exists
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: student._id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send JWT as an HTTP-only cookie with cross-domain support
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
      sameSite: "None", // Allow cross-origin requests
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ message: "Login successful", token, student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Logout route
router.post("/logout", (req, res) => {
  res.clearCookie("token"); // Clear the token cookie
  res.status(200).json({ message: "Logged out successfully" });
});

// Dashboard route (authMiddleware for authentication)
router.get("/dashboard", authMiddleware("student"), async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");
    res.status(200).json({ student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware to authenticate JWT token
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from headers
  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded; // Attach the decoded token (user info) to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

// Route to update password
router.put('/update-password', authenticate, async (req, res) => {
  const { newPassword } = req.body; // Get the new password from the request body
  const userId = req.user.id;  // Get the user ID from the JWT token payload

  try {
    // Find the student by ID (user ID stored in JWT)
    const student = await Student.findById(userId);
    if (!student) {
      return res.status(404).json({ message: "User not found." });
    }

    // Hash the new password before saving it
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the student's password with the hashed version
    student.password = hashedPassword;

    // Save the updated student document in the database
    await student.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Failed to update password." });
  }
});



// Apply authenticate middleware to the profile update route
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { department, course } = req.body;
    const studentId = req.user.id; // Get the user ID from the JWT token payload

    // Find the student by ID and update the department and course
    const student = await Student.findByIdAndUpdate(
      studentId,
      { department, course },
      { new: true } // Return the updated student
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
