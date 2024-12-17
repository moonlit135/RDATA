const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Faculty = require("../models/Faculty");

exports.registerFaculty = async (req, res) => {
  try {
    const { name, email, password, specialization } = req.body;

    // Check if faculty already exists
    const facultyExists = await Faculty.findOne({ email });
    if (facultyExists) {
      return res.status(400).json({ message: "Faculty already exists" });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newFaculty = new Faculty({
      name,
      email,
      password: hashedPassword,
      specialization,
    });

    await newFaculty.save();

    res.status(201).json({ message: "Faculty registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginFaculty = async (req, res) => {
  try {
    const { email, password } = req.body;

    const faculty = await Faculty.findOne({ email });
    if (!faculty) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: faculty._id, role: "faculty" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
