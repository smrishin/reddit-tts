import express, { Request, Response } from "express";
import logger from "../logger";
import redditService from "../services/reddit";
import { RouteHandler } from "../types";

const router = express.Router();

// Get hot posts from r/TIFU
const getTIFUHotPosts: RouteHandler = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;

    // Validate limit parameter
    if (limit < 1 || limit > 100) {
      res.status(400).json({
        success: false,
        error: "Limit must be between 1 and 100"
      });
      return;
    }

    const result = await redditService.getTIFUHotPosts(limit);

    if (!result.success) {
      res.status(500).json({
        success: false,
        error: result.error || "Failed to fetch posts from Reddit"
      });
      return;
    }

    res.json({
      success: true,
      data: result.data,
      count: result.count,
      subreddit: "TIFU",
      sort: "hot"
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    logger.error("Error in getTIFUHotPosts route", {
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined
    });

    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

// Get a specific post by ID from r/TIFU
const getTIFUPost: RouteHandler = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      res.status(400).json({
        success: false,
        error: "Post ID is required"
      });
      return;
    }

    const result = await redditService.getTIFUPost(postId);

    if (!result.success) {
      res.status(404).json({
        success: false,
        error: result.error || "Post not found"
      });
      return;
    }

    res.json({
      success: true,
      data: result.data?.[0],
      subreddit: "TIFU"
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    logger.error("Error in getTIFUPost route", {
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined
    });

    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

// Search posts in r/TIFU
const searchTIFUPosts: RouteHandler = async (req: Request, res: Response) => {
  try {
    const { q: query } = req.query;
    const limit = parseInt(req.query.limit as string) || 10;

    if (!query || typeof query !== "string") {
      res.status(400).json({
        success: false,
        error: "Search query is required"
      });
      return;
    }

    // Validate limit parameter
    if (limit < 1 || limit > 100) {
      res.status(400).json({
        success: false,
        error: "Limit must be between 1 and 100"
      });
      return;
    }

    const result = await redditService.searchTIFUPosts(query, limit);

    if (!result.success) {
      res.status(500).json({
        success: false,
        error: result.error || "Failed to search posts from Reddit"
      });
      return;
    }

    res.json({
      success: true,
      data: result.data,
      count: result.count,
      subreddit: "TIFU",
      query: query
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    logger.error("Error in searchTIFUPosts route", {
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined
    });

    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

// Define routes
router.get("/tifu/hot", getTIFUHotPosts);
router.get("/tifu/post/:postId", getTIFUPost);
router.get("/tifu/search", searchTIFUPosts);

export default router;
