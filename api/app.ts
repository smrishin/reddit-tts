import dotenv from "dotenv";
import path from "path";

// dotenv.config({ path: path.resolve(process.cwd(), "api/.env.local") });
dotenv.config({ path: path.resolve(__dirname, ".env.local") });

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import logger from "./src/logger";
import routes from "./src/routes";
import { ErrorHandler } from "./src/types";

const app = express();
const PORT: string = process.env.PORT || "3000";

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan("combined", { stream: logger.stream })); // Logging with Winston
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use((req: Request, res: Response, next: NextFunction) => {
  const clonedRequestBody = JSON.parse(JSON.stringify(req.body));

  // Commented for future use
  // delete clonedRequestBody.password;
  // delete (clonedRequestBody.data || {}).password;

  logger.info("==============================================================");
  logger.info(
    `Network incoming logs >>>
    >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    req.method          ${req.method}
    req.path            ${req.path}
    req.headers         ${JSON.stringify(req.headers, null, 1)}
    req.query           ${JSON.stringify(req.query, null, 1)}
    req.body            ${JSON.stringify(clonedRequestBody, null, 1)}
    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`
  );

  next();
});

// Routes
app.use("/", routes);

// Error handling middleware
const errorHandler: ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error("Unhandled error occurred", {
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
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path
  });
});

// Start server
app.listen(parseInt(PORT), () => {
  logger.info(`🚀 Server is running on port ${PORT}`);
  logger.info(`📱 Health check: http://localhost:${PORT}/health`);
  logger.info(`🌐 API status: http://localhost:${PORT}/api/status`);
});

export default app;
