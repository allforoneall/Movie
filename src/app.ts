import express from 'express';
import mongoose from 'mongoose';
import movieRoutes from '../routes/movieRoutes'; 
import reviewRoutes from '../routes/reviewRoutes';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);

export default app;
