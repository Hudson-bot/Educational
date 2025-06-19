// backend/routes/profileRoutes.js
import express from 'express';
import { protect } from '../utils/protect.js';
import { getProfile, updateProfile } from '../controllers/profileController.js';

const router = express.Router();

router.route('/')
  .get(protect, getProfile)
  .put(protect, updateProfile);

export default router;