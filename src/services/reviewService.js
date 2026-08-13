// reviewService.js

const reviewRepository = require("../repositories/reviewRepository");
const bookRepository = require("../repositories/bookRepository");

// Create a review
async function createReview(userId, bookId, rating, review) {
    const book = await bookRepository.findBookById(bookId);

    if (!book) {
        throw new Error("Book not found");
    }

    rating = Number(rating);

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        throw new Error("Rating must be an integer between 1 and 5");
    }

    if (review && review.trim().length > 1000) {
        throw new Error("Review cannot exceed 1000 characters");
    }

    const existingReview = await reviewRepository.findUserReview(
        userId,
        bookId
    );

    if (existingReview) {
        throw new Error("You have already reviewed this book");
    }

    const reviewId = await reviewRepository.createReview(
        userId,
        bookId,
        rating,
        review
    );

    return reviewRepository.findUserReview(userId, bookId);
}

// Get all reviews and rating information for a book
async function getBookReviews(bookId) {
    const book = await bookRepository.findBookById(bookId);

    if (!book) {
        throw new Error("Book not found");
    }

    const [reviews, ratingStats] = await Promise.all([
        reviewRepository.getBookReviews(bookId),
        reviewRepository.getBookRatingStats(bookId)
    ]);

    return {
        ratingStats,
        reviews
    };
}

// Update own review
async function updateReview(
    userId,
    reviewId,
    rating,
    review
) {
    rating = Number(rating);

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        throw new Error("Rating must be an integer between 1 and 5");
    }

    if (review && review.trim().length > 1000) {
        throw new Error("Review cannot exceed 1000 characters");
    }

    const updated = await reviewRepository.updateReview(
        reviewId,
        userId,
        rating,
        review
    );

    if (!updated) {
        throw new Error("Review not found");
    }

    return reviewRepository.findUserReviewById
        ? reviewRepository.findUserReviewById(reviewId, userId)
        : reviewRepository.findUserReview(userId, null);
}

// Delete own review
async function deleteReview(userId, reviewId) {
    const deleted = await reviewRepository.deleteReview(
        reviewId,
        userId
    );

    if (!deleted) {
        throw new Error("Review not found");
    }
}

module.exports = {
    createReview,
    getBookReviews,
    updateReview,
    deleteReview
};