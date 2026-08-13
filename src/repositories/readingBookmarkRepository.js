// readingBookmarkRepository.js
const db = require("../config/db");

// Create or update a user's reading bookmark for a book
async function saveBookmark(userId, bookId, pageNumber) {
    const [result] = await db.query(
        `INSERT INTO reading_bookmarks
            (user_id, book_id, page_number)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE
            page_number = VALUES(page_number),
            updated_at = CURRENT_TIMESTAMP`,
        [userId, bookId, pageNumber]
    );

    return result;
}

// Get a user's bookmark for a specific book
async function getBookmark(userId, bookId) {
    const [rows] = await db.query(
        `SELECT
            id,
            user_id,
            book_id,
            page_number,
            created_at,
            updated_at
         FROM reading_bookmarks
         WHERE user_id = ? AND book_id = ?`,
        [userId, bookId]
    );

    return rows[0];
}

// Delete a user's bookmark for a specific book
async function deleteBookmark(userId, bookId) {
    const [result] = await db.query(
        `DELETE FROM reading_bookmarks
         WHERE user_id = ? AND book_id = ?`,
        [userId, bookId]
    );

    return result.affectedRows > 0;
}

module.exports = {
    saveBookmark,
    getBookmark,
    deleteBookmark
};