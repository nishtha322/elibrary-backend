// wishlistRepository.jsgit
const db = require("../config/db");

// Add a book to wishlist
async function addToWishlist(userId, bookId) {
    const [result] = await db.query(
        `INSERT INTO wishlists (user_id, book_id)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE
            book_id = VALUES(book_id)`,
        [userId, bookId]
    );

    return result.insertId;
}

// Get all wishlist books for a user
async function getUserWishlist(userId) {
    const [rows] = await db.query(
        `SELECT
            w.id,
            w.user_id,
            w.book_id,
            b.title,
            b.author,
            b.description,
            b.cover_image_url,
            c.name AS category_name,
            w.created_at
         FROM wishlists w
         INNER JOIN books b
             ON w.book_id = b.id
         LEFT JOIN categories c
             ON b.category_id = c.id
         WHERE w.user_id = ?
         ORDER BY w.created_at DESC`,
        [userId]
    );

    return rows;
}

// Find a wishlist item belonging to a user
async function findWishlistItem(userId, bookId) {
    const [rows] = await db.query(
        `SELECT
            id,
            user_id,
            book_id,
            created_at
         FROM wishlists
         WHERE user_id = ? AND book_id = ?`,
        [userId, bookId]
    );

    return rows[0];
}

// Remove a book from wishlist
async function removeFromWishlist(userId, bookId) {
    const [result] = await db.query(
        `DELETE FROM wishlists
         WHERE user_id = ? AND book_id = ?`,
        [userId, bookId]
    );

    return result.affectedRows > 0;
}

module.exports = {
    addToWishlist,
    getUserWishlist,
    findWishlistItem,
    removeFromWishlist
};