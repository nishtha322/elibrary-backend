// downloadRepository.js
const db = require("../config/db");

// Record a book download
async function createDownload(userId, bookId) {
    const [result] = await db.query(
        "INSERT INTO downloads (user_id, book_id) VALUES (?, ?)",
        [userId, bookId]
    );

    return result.insertId;
}
// Get download history for a user
async function getDownloadsByUserId(userId) {
    const [rows] = await db.query(
        `SELECT
            d.id,
            d.book_id,
            b.title,
            b.author,
            d.downloaded_at
         FROM downloads d
         INNER JOIN books b ON d.book_id = b.id
         WHERE d.user_id = ?
         ORDER BY d.downloaded_at DESC`,
        [userId]
    );

    return rows;
}
module.exports = {
    createDownload,
    getDownloadsByUserId
};