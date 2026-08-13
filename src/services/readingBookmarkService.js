const readingBookmarkRepository = require("../repositories/readingBookmarkRepository");
const bookRepository = require("../repositories/bookRepository");

// Save or update reading bookmark
async function saveBookmark(userId, bookId, pageNumber) {
    const book = await bookRepository.findBookById(bookId);

    if (!book) {
        throw new Error("Book not found");
    }

    if (!Number.isInteger(pageNumber) || pageNumber < 1) {
        throw new Error("Page number must be a positive integer");
    }

    await readingBookmarkRepository.saveBookmark(
        userId,
        bookId,
        pageNumber
    );

    return readingBookmarkRepository.getBookmark(
        userId,
        bookId
    );
}

// Get reading bookmark
async function getBookmark(userId, bookId) {
    const book = await bookRepository.findBookById(bookId);

    if (!book) {
        throw new Error("Book not found");
    }

    return readingBookmarkRepository.getBookmark(
        userId,
        bookId
    );
}

// Delete reading bookmark
async function removeBookmark(userId, bookId) {
    const book = await bookRepository.findBookById(bookId);

    if (!book) {
        throw new Error("Book not found");
    }

    const deleted = await readingBookmarkRepository.deleteBookmark(
        userId,
        bookId
    );

    if (!deleted) {
        throw new Error("Bookmark not found");
    }
}

module.exports = {
    saveBookmark,
    getBookmark,
    removeBookmark
};