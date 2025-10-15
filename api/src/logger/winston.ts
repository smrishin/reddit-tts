import { format, createLogger, transports, Logger } from "winston";
import path from "path";

// Define log format
const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.errors({ stack: true }),
  format.json()
);

// Define console format for local development
const consoleFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ timestamp, level, message, stack }) => {
    if (stack) {
      return `${timestamp} [${level}]: ${message}\n${stack}`;
    }
    return `${timestamp} [${level}]: ${message}`;
  })
);

// instantiate a new Winston Logger with the settings defined above
const logger: Logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: logFormat,
  transports: [
    // File transport for all logs (colored)
    new transports.File({
      filename: path.join(__dirname, "../../logs/app.log"),
      format: consoleFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      tailable: true
    }),
    // Separate file for error logs (colored)
    new transports.File({
      filename: path.join(__dirname, "../../logs/error.log"),
      level: "error",
      format: consoleFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      tailable: true
    }),
    // Console transport for local development
    new transports.Console({
      format: consoleFormat
    })
  ],
  exitOnError: false // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
(logger as any).stream = {
  write: function (message: string) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  }
};

export { logger };
