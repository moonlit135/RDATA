// const authMiddleware = require("../middleware/authMiddleware");
// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const Faculty = require("../models/Faculty");
// const File = require("../models/File");

// const router = express.Router();

// // Faculty Registration (by Admin)
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, specialization } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newFaculty = new Faculty({ name, email, password: hashedPassword, specialization });
//     await newFaculty.save();
//     res.status(201).json({ message: "Faculty registered successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Faculty Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const faculty = await Faculty.findOne({ email });

//     if (!faculty) {
//       return res.status(404).json({ message: "Faculty not found!" });
//     }

//     const isMatch = await bcrypt.compare(password, faculty.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials!" });
//     }

//     const token = jwt.sign({ id: faculty._id, role: "faculty" }, process.env.JWT_SECRET, { expiresIn: "1d" });
//     res.status(200).json({ token, faculty });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Upload a File
// router.post("/upload", async (req, res) => {
//   try {
//     const { fileName, fileType, uploadedBy } = req.body;

//     const newFile = new File({
//       fileName,
//       fileType,
//       uploadedBy,
//       uploadedDate: new Date(),
//     });
//     await newFile.save();
//     res.status(201).json({ message: "File uploaded successfully!", file: newFile });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // View Files Uploaded by Faculty
// router.get("/files/:facultyId", async (req, res) => {
//   try {
//     const { facultyId } = req.params;
//     const files = await File.find({ uploadedBy: facultyId });
//     res.status(200).json({ files });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Update Faculty Profile
// router.put("/update-profile/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, specialization } = req.body;

//     const updatedFaculty = await Faculty.findByIdAndUpdate(
//       id,
//       { name, specialization },
//       { new: true }
//     );

//     res.status(200).json({ message: "Profile updated successfully!", faculty: updatedFaculty });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });



// // Update an Uploaded File (Only by the uploader)
// router.put("/update-file/:id", authMiddleware("faculty"), async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { fileName, fileType } = req.body;

//     const file = await File.findById(id);
//     if (!file || file.uploadedBy !== req.user.id) {
//       return res.status(403).json({ message: "Unauthorized to update this file." });
//     }

//     file.fileName = fileName || file.fileName;
//     file.fileType = fileType || file.fileType;
//     await file.save();

//     res.status(200).json({ message: "File updated successfully!", file });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Delete an Uploaded File (Only by the uploader)
// router.delete("/delete-file/:id", authMiddleware("faculty"), async (req, res) => {
//   try {
//     const { id } = req.params;

//     const file = await File.findById(id);
//     if (!file || file.uploadedBy !== req.user.id) {
//       return res.status(403).json({ message: "Unauthorized to delete this file." });
//     }

//     await file.remove();
//     res.status(200).json({ message: "File deleted successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
// router.post("/logout", (req, res) => {
//     res.clearCookie("token"); // Clear the token cookie
//     res.status(200).json({ message: "Logged out successfully" });
//   });

//   router.get("/dashboard", authMiddleware("faculty"), async (req, res) => {
//     try {
//       const faculty = await faculty.findById(req.user.id).select("-password");
//       res.status(200).json({ faculty });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
  
  

// module.exports = router;
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Faculty = require("../models/Faculty");
const File = require("../models/File");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Faculty Registration (by Admin)
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, specialization } = req.body;

    // Check if the email ends with @tezu.edu.in
    if (!email.endsWith('@tezu.edu.in')) {
      return res.status(400).json({ message: 'Please use a Tezu email address.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newFaculty = new Faculty({ name, email, password: hashedPassword, specialization });
    await newFaculty.save();
    res.status(201).json({ message: "Faculty registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Faculty Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const faculty = await Faculty.findOne({ email });

    if (!faculty) {
      return res.status(404).json({ message: "Faculty not found!" });
    }

    const isMatch = await bcrypt.compare(password, faculty.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ id: faculty._id, role: "faculty" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ token, faculty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload a File
router.post("/upload", async (req, res) => {
  try {
    const { fileName, fileType, uploadedBy } = req.body;

    const newFile = new File({
      fileName,
      fileType,
      uploadedBy,
      uploadedDate: new Date(),
    });
    await newFile.save();
    res.status(201).json({ message: "File uploaded successfully!", file: newFile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// View Files Uploaded by Faculty
router.get("/files/:facultyId", async (req, res) => {
  try {
    const { facultyId } = req.params;
    const files = await File.find({ uploadedBy: facultyId });
    res.status(200).json({ files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Faculty Profile
router.put("/update-profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, specialization } = req.body;

    const updatedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { name, specialization },
      { new: true }
    );

    res.status(200).json({ message: "Profile updated successfully!", faculty: updatedFaculty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an Uploaded File (Only by the uploader)
router.put("/update-file/:id", authMiddleware("faculty"), async (req, res) => {
  try {
    const { id } = req.params;
    const { fileName, fileType } = req.body;

    const file = await File.findById(id);
    if (!file || file.uploadedBy !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this file." });
    }

    file.fileName = fileName || file.fileName;
    file.fileType = fileType || file.fileType;
    await file.save();

    res.status(200).json({ message: "File updated successfully!", file });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an Uploaded File (Only by the uploader)
router.delete("/delete-file/:id", authMiddleware("faculty"), async (req, res) => {
  try {
    const { id } = req.params;

    const file = await File.findById(id);
    if (!file || file.uploadedBy !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this file." });
    }

    await file.remove();
    res.status(200).json({ message: "File deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Faculty Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token"); // Clear the token cookie
  res.status(200).json({ message: "Logged out successfully" });
});

// Faculty Dashboard
router.get("/dashboard", authMiddleware("faculty"), async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.user.id).select("-password");
    res.status(200).json({ faculty });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
