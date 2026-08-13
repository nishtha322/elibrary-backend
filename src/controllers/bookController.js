// bookController.js

const bookService = require("../services/bookService");

// Get all books
async function getBooks(req, res) {
    try {
        const books = await bookService.getBooks();

        res.status(200).json({
            message: "Books retrieved successfully",
            books
        });
    } catch (error) {
        console.error("Error getting books:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Get a single book
async function getBookById(req, res) {
    try {
        const { id } = req.params;

        const book = await bookService.getBookById(id);

        res.status(200).json({
            message: "Book retrieved successfully",
            book
        });
    } catch (error) {
        if (error.message === "Book not found") {
            return res.status(404).json({
                message: error.message
            });
        }

        console.error("Error getting book:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Create a new book
async function createBook(req, res) {
    try {
        const {
            title,
            author,
            description,
            categoryId,
            content,
            filePath,
            coverImageUrl
        } = req.body;

        if (!title || !author) {
            return res.status(400).json({
                message: "Title and author are required"
            });
        }

        const book = await bookService.createBook(
            title,
            author,
            description,
            categoryId,
            content,
            filePath,
            coverImageUrl
        );

        res.status(201).json({
            message: "Book created successfully",
            book
        });
    } catch (error) {
        if (error.message === "Category not found") {
            return res.status(404).json({
                message: error.message
            });
        }

        console.error("Error creating book:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Update a book
async function updateBook(req, res) {
    try {
        const { id } = req.params;

        const {
            title,
            author,
            description,
            categoryId,
            content,
            filePath,
            coverImageUrl
        } = req.body;

        if (!title || !author) {
            return res.status(400).json({
                message: "Title and author are required"
            });
        }

        const book = await bookService.updateBook(
            id,
            title,
            author,
            description,
            categoryId,
            content,
            filePath,
            coverImageUrl
        );

        res.status(200).json({
            message: "Book updated successfully",
            book
        });
    } catch (error) {
        if (
            error.message === "Book not found" ||
            error.message === "Category not found"
        ) {
            return res.status(404).json({
                message: error.message
            });
        }

        console.error("Error updating book:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Delete a book
async function deleteBook(req, res) {
    try {
        const { id } = req.params;

        await bookService.removeBook(id);

        res.status(200).json({
            message: "Book deleted successfully"
        });
    } catch (error) {
        if (error.message === "Book not found") {
            return res.status(404).json({
                message: error.message
            });
        }

        console.error("Error deleting book:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}
// Search books
async function searchBooks(req, res) {
    try {
        const { q } = req.query;

        if (!q || !q.trim()) {
            return res.status(400).json({
                message: "Search query is required"
            });
        }

        const books = await bookService.searchBooks(q);

        res.status(200).json({
            message: "Books search completed successfully",
            books
        });
    } catch (error) {
        console.error("Error searching books:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}
// Read a book
async function readBook(req, res) {
    try {
        const { id } = req.params;

        const book = await bookService.readBook(id);

        res.status(200).json({
            message: "Book content retrieved successfully",
            book
        });
    } catch (error) {
        if (error.message === "Book not found") {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        console.error("Error reading book:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}
// Download a book
async function downloadBook(req, res) {
    try {
        const { id } = req.params;

        const result = await bookService.getWatermarkedBook(
            id,
            req.user
        );

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${result.fileName}"`
        );

        res.send(result.pdf);

    } catch (error) {
        if (error.message === "Book not found") {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        if (error.message === "Book file not available") {
            return res.status(404).json({
                message: "Book file not available"
            });
        }

        console.error("Error downloading book:", error);

        res.status(500).json({
            message: "Error downloading book"
        });
    }
}
module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    searchBooks,
    readBook,
    downloadBook
};