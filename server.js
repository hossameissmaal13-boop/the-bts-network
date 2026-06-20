const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const lessonContentRoutes = require("./routes/lessonContentRoutes");
const messageRoutes = require("./routes/messageRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const postRoutes = require("./routes/postRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "NEW SERVER VERSION 14-04 🚀"
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "OK"
  });
});

app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/lesson-contents", lessonContentRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 3000;

// خليه يبدا السيرفر مباشرة
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 SERVER RUNNING ON PORT ${PORT}`);
});

// و Mongo تتصل من بعد
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error FULL:", err.message);
  });