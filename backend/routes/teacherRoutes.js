// backend/routes/teacherRoutes.js
import express from 'express';
import { protect } from '../utils/protect.js';
import {
  createTeacher,
  getTeachers,
  deleteTeacher
} from '../controllers/teacherController.js';

const router = express.Router();

router.route('/')
  .post(protect, createTeacher)
  .get(protect, getTeachers);

router.route('/:id')
  .delete(protect, deleteTeacher);

export default router;