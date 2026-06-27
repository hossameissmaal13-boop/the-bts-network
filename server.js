const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const lessonContentRoutes = require("./routes/lessonContentRoutes");
const postRoutes = require("./routes/postRoutes");
const messageRoutes = require("./routes/messageRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

// ✅ CORS مصلوح
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ باش يجاوب على preflight requests
app.options("*", cors());

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({ success: true, message: "BTS Network API 🚀" });
});

app.get("/health", (req, res) => {
  res.json({ success: true, message: "OK" });
});

app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/lesson-contents", lessonContentRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 SERVER RUNNING ON PORT ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err.message));