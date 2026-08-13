// reviewRoutes.js
const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");
const { authenticate } = require("../middleware/authMiddleware");

// Submit a rating/review for a book
router.post(
    "/books/:id/reviews",
    authenticate,
    reviewController.createReview
);

// Get all reviews and rating statistics for a book
router.get(
    "/books/:id/reviews",
    authenticate,
    reviewController.getBookReviews
);

// Update your own review
router.put(
    "/reviews/:reviewId",
    authenticate,
    reviewController.updateReview
);

// Delete your own review
router.delete(
    "/reviews/:reviewId",
    authenticate,
    reviewController.deleteReview
);

module.exports = router;