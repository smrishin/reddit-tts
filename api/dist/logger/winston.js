"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
// Define log format
const logFormat = winston_1.format.combine(winston_1.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.format.errors({ stack: true }), winston_1.format.json());
// Define console format for local development
const consoleFormat = winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.format.printf(({ timestamp, level, message, stack }) => {
    if (stack) {
        return `${timestamp} [${level}]: ${message}\n${stack}`;
    }
    return `${timestamp} [${level}]: ${message}`;
}));
// instantiate a new Winston Logger with the settings defined above
const logger = (0, winston_1.createLogger)({
    level: process.env.LOG_LEVEL || "info",
    format: logFormat,
    transports: [
        // File transport for all logs (colored)
        new winston_1.transports.File({
            filename: path_1.default.join(__dirname, "../../logs/app.log"),
            format: consoleFormat,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            tailable: true
        }),
        // Separate file for error logs (colored)
        new winston_1.transports.File({
            filename: path_1.default.join(__dirname, "../../logs/error.log"),
            level: "error",
            format: consoleFormat,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            tailable: true
        }),
        // Console transport for local development
        new winston_1.transports.Console({
            format: consoleFormat
        })
    ],
    exitOnError: false // do not exit on handled exceptions
});
exports.logger = logger;
// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function (message) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    }
};
//# sourceMappingURL=winston.js.map