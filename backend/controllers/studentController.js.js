// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const Student = require("../models/Student");

// exports.registerStudent = async (req, res) => {
//   try {
//     const { name, email, password, department, course } = req.body;

//     // Check if student already exists
//     const studentExists = await Student.findOne({ email });
//     if (studentExists) {
//       return res.status(400).json({ message: "Student already exists" });
//     }

//     // Encrypt password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newStudent = new Student({
//       name,
//       email,
//       password: hashedPassword,
//       department,
//       course,
//     });

//     await newStudent.save();

//     res.status(201).json({ message: "Student registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.loginStudent = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find student by email
//     const student = await Student.findOne({ email });
//     if (!student) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, student.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Create JWT token
//     const token = jwt.sign({ id: student._id, role: "student" }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 3600000, // 1 hour
//     });

//     res.status(200).json({ message: "Login successful" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

exports.registerStudent = async (req, res) => {
  try {
    const { name, email, password, department, course } = req.body;

    // Check if student already exists
    const studentExists = await Student.findOne({ email });
    if (studentExists) {
      return res.status(400).json({ message: "Student already exists" });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      department,
      course,
    });

    await newStudent.save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};

exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ id: student._id, role: "student" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};

