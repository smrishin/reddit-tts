const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./src/logger");
const routes = require("./src/routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan("combined", { stream: logger.stream })); // Logging with Winston
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use("/", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error("Unhandled error occurred", {
    error: err.message,
    stack: err.stack
  });
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Server is running on port ${PORT}`);
  logger.info(`📱 Health check: http://localhost:${PORT}/health`);
  logger.info(`🌐 API status: http://localhost:${PORT}/api/status`);
});

module.exports = app;
