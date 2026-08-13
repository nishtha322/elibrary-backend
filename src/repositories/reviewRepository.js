// reviewRepository.js
const db = require("../config/db");

// Create a review
async function createReview(
    userId,
    bookId,
    rating,
    review
) {
    const [result] = await db.query(
        `INSERT INTO book_reviews
        (user_id, book_id, rating, review)
        VALUES (?, ?, ?, ?)`,
        [
            userId,
            bookId,
            rating,
            review || null
        ]
    );

    return result.insertId;
}

// Find a user's review for a specific book
async function findUserReview(userId, bookId) {
    const [rows] = await db.query(
        `SELECT
            id,
            user_id,
            book_id,
            rating,
            review,
            created_at,
            updated_at
         FROM book_reviews
         WHERE user_id = ?
           AND book_id = ?`,
        [
            userId,
            bookId
        ]
    );

    return rows[0];
}

// Find a specific review belonging to a user
async function findReviewById(reviewId, userId) {
    const [rows] = await db.query(
        `SELECT
            id,
            user_id,
            book_id,
            rating,
            review,
            created_at,
            updated_at
         FROM book_reviews
         WHERE id = ?
           AND user_id = ?`,
        [
            reviewId,
            userId
        ]
    );

    return rows[0];
}

// Get all reviews for a book
async function getBookReviews(bookId) {
    const [rows] = await db.query(
        `SELECT
            br.id,
            br.user_id,
            br.book_id,
            br.rating,
            br.review,
            br.created_at,
            br.updated_at
         FROM book_reviews br
         WHERE br.book_id = ?
         ORDER BY br.created_at DESC`,
        [bookId]
    );

    return rows;
}

// Get rating statistics for a book
async function getBookRatingStats(bookId) {
    const [[stats]] = await db.query(
        `SELECT
            COUNT(*) AS total_ratings,
            COALESCE(ROUND(AVG(rating), 1), 0) AS average_rating
         FROM book_reviews
         WHERE book_id = ?`,
        [bookId]
    );

    return stats;
}

// Update a review belonging to a user
async function updateReview(
    reviewId,
    userId,
    rating,
    review
) {
    const [result] = await db.query(
        `UPDATE book_reviews
         SET rating = ?,
             review = ?
         WHERE id = ?
           AND user_id = ?`,
        [
            rating,
            review || null,
            reviewId,
            userId
        ]
    );

    return result.affectedRows > 0;
}

// Delete a review belonging to a user
async function deleteReview(
    reviewId,
    userId
) {
    const [result] = await db.query(
        `DELETE FROM book_reviews
         WHERE id = ?
           AND user_id = ?`,
        [
            reviewId,
            userId
        ]
    );

    return result.affectedRows > 0;
}

module.exports = {
    createReview,
    findUserReview,
    findReviewById,
    getBookReviews,
    getBookRatingStats,
    updateReview,
    deleteReview
};