const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();


// ============================================
// SECURITY
// ============================================

app.use(helmet());


// ============================================
// CORS
// ============================================

const allowedOrigin = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: allowedOrigin || true,
    credentials: true
  })
);


// ============================================
// BODY PARSER
// ============================================

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// ============================================
// HEALTH CHECK
// ============================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "SamajSaathi backend is running."
  });
});


// ============================================
// ROOT
// ============================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to SamajSaathi Matrimony API."
  });
});


// ============================================
// AUTH ROUTES
// ============================================

app.use("/api/auth", authRoutes);


// ============================================
// 404
// ============================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found."
  });
});


// ============================================
// ERROR HANDLER
// ============================================

app.use((err, req, res, next) => {

  console.error("SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error."
  });

});


module.exports = app;
