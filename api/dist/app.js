"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("./src/logger"));
const routes_1 = __importDefault(require("./src/routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || "3000";
// Middleware
app.use((0, helmet_1.default)()); // Security headers
app.use((0, cors_1.default)()); // Enable CORS
app.use((0, morgan_1.default)("combined", { stream: logger_1.default.stream })); // Logging with Winston
app.use(express_1.default.json()); // Parse JSON bodies
app.use(express_1.default.urlencoded({ extended: true })); // Parse URL-encoded bodies
// Routes
app.use("/", routes_1.default);
// Error handling middleware
const errorHandler = (err, req, res, next) => {
    logger_1.default.error("Unhandled error occurred", {
        error: err.message,
        stack: err.stack
    });
    res.status(500).json({
        error: "Something went wrong!",
        message: err.message
    });
};
app.use(errorHandler);
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found",
        path: req.path
    });
});
// Start server
app.listen(parseInt(PORT), () => {
    logger_1.default.info(`🚀 Server is running on port ${PORT}`);
    logger_1.default.info(`📱 Health check: http://localhost:${PORT}/health`);
    logger_1.default.info(`🌐 API status: http://localhost:${PORT}/api/status`);
});
exports.default = app;
//# sourceMappingURL=app.js.map