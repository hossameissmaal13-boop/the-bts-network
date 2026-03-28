const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');
const lessonRoutes = require("./routes/lessonRoutes");
const lessonContentRoutes = require("./routes/lessonContentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BTS Network API is running 🚀");
});

app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/lesson-contents", lessonContentRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 SERVER RUNNING ON PORT ${PORT}`);
});