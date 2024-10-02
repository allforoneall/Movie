import { Request, Response } from 'express';
import Movie from '../models/MovieModel';
import Review from '../models/ReviewModel';

// Add a new movie
export const addMovie = async (req: Request, res: Response): Promise<void> => {
  const { name, releaseDate } = req.body;
  try {
    const newMovie = new Movie({ name, releaseDate, averageRating: null });
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie); // No return value, just send the response
  } catch (error) {
    res.status(400).json({ error: 'Error adding movie' });
  }
};


// Get all movies
export const getMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies); // Send response
  } catch (error) {
    res.status(400).json({ error: 'Error fetching movies' });
  }
};


// Get movie by ID
export const getMovieById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      res.status(404).json({ error: 'Movie not found' });
      return; // Stop further execution
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching movie' });
  }
};


// Update a movie
export const updateMovie = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const { name, releaseDate } = req.body;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { name, releaseDate },
      { new: true }
    );
    if (!updatedMovie) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(400).json({ error: 'Error updating movie' });
  }
};


// Delete a movie and associated reviews
export const deleteMovie = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      res.status(404).json({ error: 'Movie not found' });
      return;
    }

    await Movie.findByIdAndDelete(req.params.id);
    await Review.deleteMany({ movieId: req.params.id });

    res.status(200).json({ message: 'Movie and reviews deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting movie' });
  }
};


// Calculate average rating
export const calculateAverageRating = async (movieId: string) => {
  try {
    const reviews = await Review.find({ movieId });
    if (reviews.length === 0) return null;

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    await Movie.findByIdAndUpdate(movieId, { averageRating });
    return averageRating;
  } catch (error) {
    throw new Error('Error calculating average rating');
  }
};
