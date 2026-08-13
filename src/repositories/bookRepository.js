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
// Advanced search books
async function searchBooks({
    q,
    title,
    author,
    categoryId,
    page = 1,
    limit = 10,
    sort = "created_at",
    order = "desc"
}) {
    const conditions = [];
    const params = [];

    // General keyword search
    if (q) {
        conditions.push(`
            (
                b.title LIKE ?
                OR b.author LIKE ?
                OR b.description LIKE ?
            )
        `);

        const keyword = `%${q}%`;
        params.push(keyword, keyword, keyword);
    }

    // Search specifically by title
    if (title) {
        conditions.push("b.title LIKE ?");
        params.push(`%${title}%`);
    }

    // Search specifically by author
    if (author) {
        conditions.push("b.author LIKE ?");
        params.push(`%${author}%`);
    }

    // Filter by category
    if (categoryId) {
        conditions.push("b.category_id = ?");
        params.push(categoryId);
    }

    const whereClause =
        conditions.length > 0
            ? `WHERE ${conditions.join(" AND ")}`
            : "";

    // Whitelist sortable columns
    const allowedSortFields = {
        title: "b.title",
        author: "b.author",
        created_at: "b.created_at"
    };

    const sortColumn =
        allowedSortFields[sort] || allowedSortFields.created_at;

    const sortOrder =
        order.toLowerCase() === "asc" ? "ASC" : "DESC";

    // Make sure pagination values are valid
    page = Math.max(parseInt(page) || 1, 1);
    limit = Math.min(Math.max(parseInt(limit) || 10, 1), 50);

    const offset = (page - 1) * limit;

    // Get total matching books
    const [countRows] = await db.query(
        `
        SELECT COUNT(*) AS total
        FROM books b
        LEFT JOIN categories c
            ON b.category_id = c.id
        ${whereClause}
        `,
        params
    );

    const total = countRows[0].total;

    // Get paginated books
    const [rows] = await db.query(
        `
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
        ${whereClause}
        ORDER BY ${sortColumn} ${sortOrder}
        LIMIT ? OFFSET ?
        `,
        [...params, limit, offset]
    );

    return {
        books: rows,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
}
module.exports = {
    getAllBooks,
    findBookById,
    createBook,
    updateBook,
    deleteBookById,
    searchBooks
};