"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAverageRating = exports.deleteMovie = exports.updateMovie = exports.getMovieById = exports.getMovies = exports.addMovie = void 0;
const MovieModel_1 = __importDefault(require("../models/MovieModel"));
const ReviewModel_1 = __importDefault(require("../models/ReviewModel"));
// Add a new movie
const addMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, releaseDate } = req.body;
    try {
        const newMovie = new MovieModel_1.default({ name, releaseDate, averageRating: null });
        const savedMovie = yield newMovie.save();
        res.status(201).json(savedMovie); // No return value, just send the response
    }
    catch (error) {
        res.status(400).json({ error: 'Error adding movie' });
    }
});
exports.addMovie = addMovie;
// Get all movies
const getMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield MovieModel_1.default.find();
        res.status(200).json(movies); // Send response
    }
    catch (error) {
        res.status(400).json({ error: 'Error fetching movies' });
    }
});
exports.getMovies = getMovies;
// Get movie by ID
const getMovieById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield MovieModel_1.default.findById(req.params.id);
        if (!movie) {
            res.status(404).json({ error: 'Movie not found' });
            return; // Stop further execution
        }
        res.status(200).json(movie);
    }
    catch (error) {
        res.status(400).json({ error: 'Error fetching movie' });
    }
});
exports.getMovieById = getMovieById;
// Update a movie
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, releaseDate } = req.body;
    try {
        const updatedMovie = yield MovieModel_1.default.findByIdAndUpdate(req.params.id, { name, releaseDate }, { new: true });
        if (!updatedMovie) {
            res.status(404).json({ error: 'Movie not found' });
            return;
        }
        res.status(200).json(updatedMovie);
    }
    catch (error) {
        res.status(400).json({ error: 'Error updating movie' });
    }
});
exports.updateMovie = updateMovie;
// Delete a movie and associated reviews
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield MovieModel_1.default.findById(req.params.id);
        if (!movie) {
            res.status(404).json({ error: 'Movie not found' });
            return;
        }
        yield MovieModel_1.default.findByIdAndDelete(req.params.id);
        yield ReviewModel_1.default.deleteMany({ movieId: req.params.id });
        res.status(200).json({ message: 'Movie and reviews deleted' });
    }
    catch (error) {
        res.status(400).json({ error: 'Error deleting movie' });
    }
});
exports.deleteMovie = deleteMovie;
// Calculate average rating
const calculateAverageRating = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield ReviewModel_1.default.find({ movieId });
        if (reviews.length === 0)
            return null;
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        yield MovieModel_1.default.findByIdAndUpdate(movieId, { averageRating });
        return averageRating;
    }
    catch (error) {
        throw new Error('Error calculating average rating');
    }
});
exports.calculateAverageRating = calculateAverageRating;
