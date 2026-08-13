const reviewService = require("../services/reviewService");

// Create a review
async function createReview(req, res) {
    try {
        const { id } = req.params;
        const { rating, review } = req.body;

        if (rating === undefined || rating === null) {
            return res.status(400).json({
                message: "Rating is required"
            });
        }

        const result = await reviewService.createReview(
            req.user.id,
            id,
            rating,
            review
        );

        res.status(201).json({
            message: "Review submitted successfully",
            review: result
        });
    } catch (error) {
        if (error.message === "Book not found") {
            return res.status(404).json({
                message: error.message
            });
        }

        if (
            error.message === "Rating must be an integer between 1 and 5" ||
            error.message === "Review cannot exceed 1000 characters"
        ) {
            return res.status(400).json({
                message: error.message
            });
        }

        if (error.message === "You have already reviewed this book") {
            return res.status(409).json({
                message: error.message
            });
        }

        console.error("Error creating review:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Get all reviews for a book
async function getBookReviews(req, res) {
    try {
        const { id } = req.params;

        const result = await reviewService.getBookReviews(id);

        res.status(200).json({
            message: "Book reviews retrieved successfully",
            ...result
        });
    } catch (error) {
        if (error.message === "Book not found") {
            return res.status(404).json({
                message: error.message
            });
        }

        console.error("Error getting book reviews:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Update own review
async function updateReview(req, res) {
    try {
        const { reviewId } = req.params;
        const { rating, review } = req.body;

        if (rating === undefined || rating === null) {
            return res.status(400).json({
                message: "Rating is required"
            });
        }

        const result = await reviewService.updateReview(
            req.user.id,
            reviewId,
            rating,
            review
        );

        res.status(200).json({
            message: "Review updated successfully",
            review: result
        });
    } catch (error) {
        if (error.message === "Review not found") {
            return res.status(404).json({
                message: error.message
            });
        }

        if (
            error.message === "Rating must be an integer between 1 and 5" ||
            error.message === "Review cannot exceed 1000 characters"
        ) {
            return res.status(400).json({
                message: error.message
            });
        }

        console.error("Error updating review:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Delete own review
async function deleteReview(req, res) {
    try {
        const { reviewId } = req.params;

        await reviewService.deleteReview(
            req.user.id,
            reviewId
        );

        res.status(200).json({
            message: "Review deleted successfully"
        });
    } catch (error) {
        if (error.message === "Review not found") {
            return res.status(404).json({
                message: error.message
            });
        }

        console.error("Error deleting review:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    createReview,
    getBookReviews,
    updateReview,
    deleteReview
};