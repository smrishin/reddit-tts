"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Base route
router.get("/", (req, res) => {
    const response = {
        message: "Welcome to Reddit TTS API",
        version: "1.0.0",
        status: "running"
    };
    res.json(response);
});
// Health check route
router.get("/health", (req, res) => {
    const response = {
        status: "healthy",
        timestamp: new Date().toISOString()
    };
    res.json(response);
});
// API Routes
router.get("/api/status", (req, res) => {
    const response = {
        message: "API is running",
        endpoints: {
            health: "/health",
            status: "/api/status"
        }
    };
    res.json(response);
});
exports.default = router;
//# sourceMappingURL=index.js.map