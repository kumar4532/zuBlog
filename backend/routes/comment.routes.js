import express from "express";
import { createComment, deleteComment, getComment, updateComment } from "../controllers/comment.controller.js";
import protectedRoute from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:postId/", protectedRoute, createComment)
router.delete("/:commentId", protectedRoute, deleteComment)
router.put("/:commentId", protectedRoute, updateComment)
router.get("/:postId/", protectedRoute, getComment)

export default router;