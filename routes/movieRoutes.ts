import { Router } from 'express';
import {
  addMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from '../controllers/movieController';

const router = Router();

router.post('/', addMovie);
router.get('/', getMovies);
router.get('/:id', getMovieById);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;
