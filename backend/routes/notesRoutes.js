import express from 'express';
import { protect } from '../utils/protect.js';
import { saveNote, getNote, deleteNote } from '../controllers/notesController.js';

const router = express.Router();

router.route('/')
  .post(protect, saveNote)
  .get(protect, getNote)
  .delete(protect, deleteNote);

export default router;