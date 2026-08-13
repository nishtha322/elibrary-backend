// bookRepository.js

const db = require("../config/db");

// Get all books
async function getAllBooks() {
    const [rows] = await db.query(`
        SELECT
            b.id,
            b.title,
            b.author,
            b.description,
            b.category_id,
            c.name AS category_name,
            b.file_path,
            b.cover_image_url,
            b.created_at,
            b.updated_at
        FROM books b
        LEFT JOIN categories c
            ON b.category_id = c.id
        ORDER BY b.created_at DESC
    `);

    return rows;
}

// Find a book by ID
async function findBookById(id) {
    const [rows] = await db.query(`
        SELECT
            b.id,
            b.title,
            b.author,
            b.description,
            b.category_id,
            c.name AS category_name,
            b.content,
            b.file_path,
            b.cover_image_url,
            b.created_at,
            b.updated_at
        FROM books b
        LEFT JOIN categories c
            ON b.category_id = c.id
        WHERE b.id = ?
    `, [id]);

    return rows[0];
}

// Create a new book
async function createBook(
    title,
    author,
    description,
    categoryId,
    content,
    filePath,
    coverImageUrl
) {
    const [result] = await db.query(
        `INSERT INTO books
        (title, author, description, category_id, content, file_path, cover_image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            title,
            author,
            description || null,
            categoryId || null,
            content || null,
            filePath || null,
            coverImageUrl || null
        ]
    );

    return result.insertId;
}

// Update a book
async function updateBook(
    id,
    title,
    author,
    description,
    categoryId,
    content,
    filePath,
    coverImageUrl
) {
    const [result] = await db.query(
        `UPDATE books
         SET title = ?,
             author = ?,
             description = ?,
             category_id = ?,
             content = ?,
             file_path = ?,
             cover_image_url = ?
         WHERE id = ?`,
        [
            title,
            author,
            description || null,
            categoryId || null,
            content || null,
            filePath || null,
            coverImageUrl || null,
            id
        ]
    );

    return result.affectedRows > 0;
}

// Delete a book
async function deleteBookById(id) {
    const [result] = await db.query(
        "DELETE FROM books WHERE id = ?",
        [id]
    );

    return result.affectedRows > 0;
}
// Search books by title or author
async function searchBooks(query) {
    const [rows] = await db.query(`
        SELECT
            b.id,
            b.title,
            b.author,
            b.description,
            b.category_id,
            c.name AS category_name,
            b.file_path,
            b.cover_image_url,
            b.created_at,
            b.updated_at
        FROM books b
        LEFT JOIN categories c
            ON b.category_id = c.id
        WHERE b.title LIKE ?
           OR b.author LIKE ?
        ORDER BY b.created_at DESC
    `, [`%${query}%`, `%${query}%`]);

    return rows;
}
module.exports = {
    getAllBooks,
    findBookById,
    createBook,
    updateBook,
    deleteBookById,
    searchBooks
};