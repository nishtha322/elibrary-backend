// dashboardRepository.js
const db = require("../config/db");

// Get user's dashboard statistics
async function getDashboardStats(userId) {
    const [[stats]] = await db.query(
        `
        SELECT
            (SELECT COUNT(*)
             FROM downloads
             WHERE user_id = ?) AS total_downloads,

            (SELECT COUNT(*)
             FROM reading_bookmarks
             WHERE user_id = ?) AS total_bookmarks,

            (SELECT COUNT(*)
             FROM highlights
             WHERE user_id = ?) AS total_highlights,

            (SELECT COUNT(*)
             FROM wishlists
             WHERE user_id = ?) AS total_wishlist
        `,
        [userId, userId, userId, userId]
    );

    return stats;
}

// Get recently downloaded books
async function getRecentDownloads(userId) {
    const [rows] = await db.query(
        `
        SELECT
            d.id,
            d.book_id,
            b.title,
            b.author,
            d.downloaded_at
        FROM downloads d
        INNER JOIN books b
            ON d.book_id = b.id
        WHERE d.user_id = ?
        ORDER BY d.downloaded_at DESC
        LIMIT 5
        `,
        [userId]
    );

    return rows;
}

// Get user's bookmarks
async function getBookmarks(userId) {
    const [rows] = await db.query(
        `
        SELECT
            rb.id,
            rb.book_id,
            b.title,
            b.author,
            rb.page_number,
            rb.updated_at
        FROM reading_bookmarks rb
        INNER JOIN books b
            ON rb.book_id = b.id
        WHERE rb.user_id = ?
        ORDER BY rb.updated_at DESC
        `,
        [userId]
    );

    return rows;
}

// Get user's wishlist
async function getWishlist(userId) {
    const [rows] = await db.query(
        `
        SELECT
            w.id,
            w.book_id,
            b.title,
            b.author,
            b.cover_image_url,
            w.created_at
        FROM wishlists w
        INNER JOIN books b
            ON w.book_id = b.id
        WHERE w.user_id = ?
        ORDER BY w.created_at DESC
        `,
        [userId]
    );

    return rows;
}

// Get user's recent highlights
async function getRecentHighlights(userId) {
    const [rows] = await db.query(
        `
        SELECT
            h.id,
            h.book_id,
            b.title,
            h.page_number,
            h.selected_text,
            h.note,
            h.created_at
        FROM highlights h
        INNER JOIN books b
            ON h.book_id = b.id
        WHERE h.user_id = ?
        ORDER BY h.created_at DESC
        LIMIT 5
        `,
        [userId]
    );

    return rows;
}

module.exports = {
    getDashboardStats,
    getRecentDownloads,
    getBookmarks,
    getWishlist,
    getRecentHighlights
};