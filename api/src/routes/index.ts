import express, { Request, Response } from "express";
import logger from "../logger";
import { ApiResponse, RouteHandler } from "../types";
import redditRoutes from "./reddit";
import testRoutes from "./test";

const router = express.Router();

// Base route
const homeHandler: RouteHandler = (req: Request, res: Response) => {
  const response: ApiResponse = {
    message: "Welcome to Reddit TTS API",
    version: "1.0.0",
    status: "running"
  };
  res.json(response);
};

// Health check route
const healthHandler: RouteHandler = (req: Request, res: Response) => {
  const response: ApiResponse = {
    status: "healthy",
    timestamp: new Date().toISOString()
  };
  res.json(response);
};

// API Routes
const statusHandler: RouteHandler = (req: Request, res: Response) => {
  const response: ApiResponse = {
    message: "API is running",
    endpoints: {
      health: "/health",
      status: "/api/statuss",
      "reddit/{subreddit}/hot": "/api/reddit/{subreddit}/hot",
      "reddit/{subreddit}/post": "/api/reddit/{subreddit}/post",
      "reddit/{subreddit}/search": "/api/reddit/{subreddit}/search"
    }
  };
  res.json(response);
};

router.get("/", homeHandler);
router.get("/health", healthHandler);
router.get("/api/status", statusHandler);

// Reddit API routes
router.use("/api/reddit", redditRoutes);
router.use("/api/test", testRoutes);

export default router;
