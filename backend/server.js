import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import authRoutes from './routes/authRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import connectDB from './config/db.js';
import cors from 'cors';
import { fileURLToPath } from 'url';
import notesRoutes from './routes/notesRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Body parser
app.use(express.json());

// Serve static uploads (for video/paper files)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // ✅ Serve static files

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/v1/content', contentRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/v1/content/notes', notesRoutes);
app.use('/api/v1/profile', profileRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
