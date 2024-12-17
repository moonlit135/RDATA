const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Faculty = require("../models/Faculty");
const Student = require("../models/Student");
const File = require("../models/File");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();


// Admin Delete Any File
router.delete("/delete-file/:id", authMiddleware("admin"), async (req, res) => {
  try {
    const { id } = req.params;

    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ message: "File not found!" });
    }

    await file.remove();
    res.status(200).json({ message: "File deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




// Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Faculty Account
router.post("/create-faculty", async (req, res) => {
  try {
    const { name, email, password, specialization } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newFaculty = new Faculty({ name, email, password: hashedPassword, specialization });
    await newFaculty.save();
    res.status(201).json({ message: "Faculty account created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Student Account
router.delete("/delete-student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.status(200).json({ message: "Student account deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Faculty Account
router.delete("/delete-faculty/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Faculty.findByIdAndDelete(id);
    res.status(200).json({ message: "Faculty account deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Manage Files (Delete or Modify)
router.delete("/delete-file/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await File.findByIdAndDelete(id);
    res.status(200).json({ message: "File deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/logout", (req, res) => {
  res.clearCookie("token"); // Clear the token cookie
  res.status(200).json({ message: "Logged out successfully" });
});

router.get("/dashboard", authMiddleware("admin"), async (req, res) => {
  try {
    const admin = await admin.findById(req.user.id).select("-password");
    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
