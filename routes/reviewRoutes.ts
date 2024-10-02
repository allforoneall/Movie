import { Router } from 'express';
import {
  addReview,
  getReviewsByMovieId,
  deleteReview,
} from '../controllers/reviewController';

const router = Router();

router.post('/', addReview);
router.get('/:movieId', getReviewsByMovieId);
router.delete('/:id', deleteReview);

export default router;
