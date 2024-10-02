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
exports.deleteReview = exports.getReviewsByMovieId = exports.addReview = void 0;
const ReviewModel_1 = __importDefault(require("../models/ReviewModel"));
const movieController_1 = require("./movieController");
// Add a new review
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId, reviewerName, rating, reviewComments } = req.body;
    try {
        const newReview = new ReviewModel_1.default({
            movieId,
            reviewerName,
            rating,
            reviewComments,
        });
        const savedReview = yield newReview.save();
        // Update movie average rating
        yield (0, movieController_1.calculateAverageRating)(movieId);
        res.status(201).json(savedReview);
    }
    catch (error) {
        res.status(400).json({ error: 'Error adding review' });
    }
});
exports.addReview = addReview;
// Get reviews by movie ID
const getReviewsByMovieId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield ReviewModel_1.default.find({ movieId: req.params.movieId });
        res.status(200).json(reviews);
    }
    catch (error) {
        res.status(400).json({ error: 'Error fetching reviews' });
    }
});
exports.getReviewsByMovieId = getReviewsByMovieId;
// Delete a review
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield ReviewModel_1.default.findByIdAndDelete(req.params.id);
        if (!review) {
            res.status(404).json({ error: 'Review not found' });
            return; // explicitly stop further execution
        }
        // Update movie average rating
        yield (0, movieController_1.calculateAverageRating)(review.movieId.toString());
        res.status(200).json({ message: 'Review deleted' });
    }
    catch (error) {
        res.status(400).json({ error: 'Error deleting review' });
    }
});
exports.deleteReview = deleteReview;
