import { Request, Response } from 'express';
import Review from '../models/ReviewModel';
import { calculateAverageRating } from './movieController';

// Add a new review
export const addReview = async (req: Request, res: Response): Promise<void> => {
  const { movieId, reviewerName, rating, reviewComments } = req.body;
  try {
    const newReview = new Review({
      movieId,
      reviewerName,
      rating,
      reviewComments,
    });
    const savedReview = await newReview.save();

    // Update movie average rating
    await calculateAverageRating(movieId);

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ error: 'Error adding review' });
  }
};

// Get reviews by movie ID
export const getReviewsByMovieId = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching reviews' });
  }
};

// Delete a review
export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      res.status(404).json({ error: 'Review not found' });
      return; // explicitly stop further execution
    }
    // Update movie average rating
    await calculateAverageRating(review.movieId.toString());

    res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting review' });
  }
};
