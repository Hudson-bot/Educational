import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import authRoutes from './routes/authRoutes.js';
import contentRoutes from './routes/contentRoutes.js'; // ✅ Add content routes
import connectDB from './config/db.js';
import cors from 'cors';
import { fileURLToPath } from 'url';

dotenv.config();
connectDB();

const app = express();

// Enable CORS
app.use(cors());

// Body parser
app.use(express.json());

// Serve static uploads (for video/paper files)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // ✅ Serve static files

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes); // ✅ Mount content routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
