const logger = require("./index");

// Example usage of the logger
logger.info("This is an info message");
logger.warn("This is a warning message");
logger.error("This is an error message");

// Logging with additional context
logger.info("User login attempt", {
  userId: "12345",
  ip: "192.168.1.1",
  timestamp: new Date().toISOString()
});

// Logging errors with stack traces
try {
  throw new Error("Something went wrong");
} catch (error) {
  logger.error("Caught an error", {
    error: error.message,
    stack: error.stack
  });
}

// Logging HTTP requests (this will be handled by Morgan)
logger.info("HTTP request processed");
