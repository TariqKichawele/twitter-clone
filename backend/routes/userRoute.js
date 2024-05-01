import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { 
    getUserProfile, 
    followUnfollowUser, 
    updateUser, 
    getSuggestedUsers 
} from '../controllers/userController.js';

const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);
router.post("/follow/:id", protectRoute, followUnfollowUser);
router.post('/update', protectRoute, updateUser);
router.get('/suggested', protectRoute, getSuggestedUsers);

export default router;