import express from 'express';
import { generateQuestions, generateFeedback } from '../controllers/interviewController.js';

const router = express.Router();

router.post('/generate', generateQuestions);
router.post('/feedback', generateFeedback);

export default router;
