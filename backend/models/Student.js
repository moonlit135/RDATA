const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /@tezu\.ac\.in$/ },
  password: { type: String, required: true },
  department: { type: String, required: true },
  course: { type: String, required: true },
});

module.exports = mongoose.model("Student", studentSchema);
