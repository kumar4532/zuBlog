import express from 'express'
import protectedRoute from '../middleware/auth.middleware.js';
import { createPost, deletePost, getAllPosts, getAllUserPosts, getPost, searchPost, updatePost } from '../controllers/post.controller.js';
import { upload } from '../middleware/multer.middleware.js';

const router = express.Router();

// router.use(protectedRoute);

router.post("/", protectedRoute, upload.single("cover"), createPost)
router.delete("/:id", protectedRoute, deletePost)
router.put("/:id", protectedRoute, upload.single("cover"), updatePost)
router.get("/:id", getPost)
router.get("/all/posts", getAllPosts)
router.get("/user/all", protectedRoute, getAllUserPosts)
router.get("/", searchPost);

export default router;