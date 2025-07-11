const express = require("express");
const logger = require("../logger");

const router = express.Router();

// Base route
router.get("/", (req, res) => {
  res.json({
    message: "Welcome to Reddit TTS API",
    version: "1.0.0",
    status: "running"
  });
});

// Health check route
router.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// API Routes
router.get("/api/status", (req, res) => {
  res.json({
    message: "API is running",
    endpoints: {
      health: "/health",
      status: "/api/status"
    }
  });
});

module.exports = router;
