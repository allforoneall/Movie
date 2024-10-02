"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewController_1 = require("../controllers/reviewController");
const router = (0, express_1.Router)();
router.post('/', reviewController_1.addReview);
router.get('/:movieId', reviewController_1.getReviewsByMovieId);
router.delete('/:id', reviewController_1.deleteReview);
exports.default = router;
