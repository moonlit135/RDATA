// // models/Faculty.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const facultySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     validate: {
//       validator: (v) => /@tezu.edu.in$/.test(v), // Ensuring email is Tezu email
//       message: 'Email must be a Tezu email address',
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// facultySchema.pre('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// const Faculty = mongoose.model('Faculty', facultySchema);
// module.exports = Faculty;

const mongoose = require("mongoose");

// Custom email validation for Tezu email
const emailValidator = (email) => {
  return email.endsWith('@tezu.edu.in');
};

const facultySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: emailValidator,
      message: 'Please use a Tezu email address.',
    },
  },
  password: { type: String, required: true },
  specialization: { type: String },
});

module.exports = mongoose.model("Faculty", facultySchema);

