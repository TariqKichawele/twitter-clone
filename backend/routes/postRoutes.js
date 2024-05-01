import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { 
    commentOnPost,
    createPost, 
    deletePost, 
    getAllPosts, 
    getFollowingPosts, 
    getLikedPosts, 
    getUserPosts,
    likeUnlikePosts
} from '../controllers/postController.js';

const router = express.Router();


router.post("/create", protectRoute, createPost);
router.delete('/:id', protectRoute, deletePost);
router.get("/all", protectRoute, getAllPosts);
router.get('/following', protectRoute, getFollowingPosts);
router.get("/likes/:id", protectRoute, getLikedPosts);
router.get("/user/:username", protectRoute, getUserPosts);
router.post("/like/:id", protectRoute, likeUnlikePosts);
router.post("/comment/:id", protectRoute, commentOnPost);

export default router;
