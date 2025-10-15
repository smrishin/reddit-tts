import express, { Request, Response } from "express";
import logger from "../logger";
import redditService from "../services/reddit";
import { RouteHandler } from "../types";
import { textToSpeechBuffer } from "../services/elevanlabs";
const router = express.Router();

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

    const postText = result?.data?.[0]?.selftext ?? "";

    const audioResult = await textToSpeechBuffer(postText);

    res.setHeader("Content-Type", "audio/mpeg"); // or audio/wav depending on outputFormat
    res.setHeader(
      "Content-Disposition",
      `inline; filename=${postId}_speech.mp3`
    );
    res.send(audioResult);

    // res.json({
    //   success: true,
    //   data: result.data?.[0],
    //   subreddit: "TIFU"
    // });
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

// Define routes
router.get("/tts/reddit/:postId", getTIFUPost);

export default router;
