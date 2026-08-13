// highlightRepository.js

const db = require("../config/db");

// Create a highlight
async function createHighlight(
    userId,
    bookId,
    pageNumber,
    selectedText,
    note
) {
    const [result] = await db.query(
        `INSERT INTO highlights
            (user_id, book_id, page_number, selected_text, note)
         VALUES (?, ?, ?, ?, ?)`,
        [
            userId,
            bookId,
            pageNumber || null,
            selectedText,
            note || null
        ]
    );

    return result.insertId;
}

// Get all highlights for a user in a book
async function getHighlights(userId, bookId) {
    const [rows] = await db.query(
        `SELECT
            id,
            user_id,
            book_id,
            page_number,
            selected_text,
            note,
            created_at,
            updated_at
         FROM highlights
         WHERE user_id = ? AND book_id = ?
         ORDER BY page_number ASC, created_at ASC`,
        [userId, bookId]
    );

    return rows;
}

// Find one highlight belonging to a user
async function findHighlightById(id, userId) {
    const [rows] = await db.query(
        `SELECT
            id,
            user_id,
            book_id,
            page_number,
            selected_text,
            note,
            created_at,
            updated_at
         FROM highlights
         WHERE id = ? AND user_id = ?`,
        [id, userId]
    );

    return rows[0];
}

// Update a highlight
async function updateHighlight(
    id,
    userId,
    pageNumber,
    selectedText,
    note
) {
    const [result] = await db.query(
        `UPDATE highlights
         SET page_number = ?,
             selected_text = ?,
             note = ?
         WHERE id = ? AND user_id = ?`,
        [
            pageNumber || null,
            selectedText,
            note || null,
            id,
            userId
        ]
    );

    return result.affectedRows > 0;
}

// Delete a highlight
async function deleteHighlight(id, userId) {
    const [result] = await db.query(
        `DELETE FROM highlights
         WHERE id = ? AND user_id = ?`,
        [id, userId]
    );

    return result.affectedRows > 0;
}

module.exports = {
    createHighlight,
    getHighlights,
    findHighlightById,
    updateHighlight,
    deleteHighlight
};