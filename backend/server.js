// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const studentRoutes = require('./routes/studentRoutes');
// const facultyRoutes = require('./routes/facultyRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// const session = require('express-session');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json()); // for parsing application/json

// // Session setup
// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } // Set to true if using https
// }));

// // Use routes
// app.use('/api/students', studentRoutes);
// app.use('/api/faculty', facultyRoutes);
// app.use('/api/admin', adminRoutes);

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/Rdatarepository', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('MongoDB connected');
//     })
//     .catch((err) => {
//         console.error('MongoDB connection error:', err);
//     });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const studentRoutes = require('./routes/studentRoutes');
// const facultyRoutes = require('./routes/facultyRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// const session = require('express-session');
// const authRoutes = require('./routes/auth');
// const dbConfig = require('./config/db');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json()); // for parsing application/json

// // Session setup
// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false } // Set to true if using https
// }));

// // Use routes
// app.use('/api/students', studentRoutes);
// app.use('/api/faculty', facultyRoutes);
// app.use('/api/admin', adminRoutes);
// // Routes
// app.use('/api/auth', authRoutes);

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://pallabidas801:Paul1234@cluster1.qpnil.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('MongoDB connected');
//     })
//     .catch((err) => {
//         console.error('MongoDB connection error:', err);
//     });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes"); // Ensure correct import

// Load environment variables from .env
dotenv.config();

const app = express();

// Middleware
app.use(express.json());  // for parsing application/json
app.use(cookieParser());  // for handling cookies
app.use(cors({
  origin: process.env.FRONTEND_URL, // Ensure this is your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],  // Allow necessary HTTP methods
  credentials: true,  // Allow credentials such as cookies
}));

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/Stlogin',studentRoutes);
app.use('/api/student',studentRoutes);

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
