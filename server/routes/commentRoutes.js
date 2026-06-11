import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  addComment,
  getComments,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

// Get all comments for a post
router.get("/:postId", getComments);

// Add comment
router.post("/:postId", protect, addComment);

// Delete comment
router.delete("/:id", protect, deleteComment);

export default router;