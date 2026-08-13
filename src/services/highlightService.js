// highlightService.js
const highlightRepository = require("../repositories/highlightRepository");
const bookRepository = require("../repositories/bookRepository");

// Create a highlight
async function createHighlight(
    userId,
    bookId,
    pageNumber,
    selectedText,
    note
) {
    const book = await bookRepository.findBookById(bookId);

    if (!book) {
        throw new Error("Book not found");
    }

    if (!selectedText || !selectedText.trim()) {
        throw new Error("Selected text is required");
    }

    if (
        pageNumber !== undefined &&
        pageNumber !== null &&
        (!Number.isInteger(pageNumber) || pageNumber < 1)
    ) {
        throw new Error("Page number must be a positive integer");
    }

    const highlightId = await highlightRepository.createHighlight(
        userId,
        bookId,
        pageNumber,
        selectedText.trim(),
        note?.trim()
    );

    return highlightRepository.findHighlightById(
        highlightId,
        userId
    );
}

// Get all highlights for a book
async function getHighlights(userId, bookId) {
    const book = await bookRepository.findBookById(bookId);

    if (!book) {
        throw new Error("Book not found");
    }

    return highlightRepository.getHighlights(userId, bookId);
}

// Update a highlight
async function updateHighlight(
    userId,
    highlightId,
    pageNumber,
    selectedText,
    note
) {
    const existingHighlight =
        await highlightRepository.findHighlightById(
            highlightId,
            userId
        );

    if (!existingHighlight) {
        throw new Error("Highlight not found");
    }

    if (!selectedText || !selectedText.trim()) {
        throw new Error("Selected text is required");
    }

    if (
        pageNumber !== undefined &&
        pageNumber !== null &&
        (!Number.isInteger(pageNumber) || pageNumber < 1)
    ) {
        throw new Error("Page number must be a positive integer");
    }

    await highlightRepository.updateHighlight(
        highlightId,
        userId,
        pageNumber,
        selectedText.trim(),
        note?.trim()
    );

    return highlightRepository.findHighlightById(
        highlightId,
        userId
    );
}

// Delete a highlight
async function removeHighlight(userId, highlightId) {
    const existingHighlight =
        await highlightRepository.findHighlightById(
            highlightId,
            userId
        );

    if (!existingHighlight) {
        throw new Error("Highlight not found");
    }

    await highlightRepository.deleteHighlight(
        highlightId,
        userId
    );
}

module.exports = {
    createHighlight,
    getHighlights,
    updateHighlight,
    removeHighlight
};