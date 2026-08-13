// readingBookmarkController.js
const readingBookmarkService = require("../services/readingBookmarkService");

// Save or update reading bookmark
async function saveBookmark(req, res) {
    try {
        const { id } = req.params;
        const { pageNumber } = req.body;

        if (pageNumber === undefined) {
            return res.status(400).json({
                message: "Page number is required"
            });
        }

        const bookmark = await readingBookmarkService.saveBookmark(
            req.user.id,
            id,
            Number(pageNumber)
        );

        res.status(200).json({
            message: "Reading bookmark saved successfully",
            bookmark
        });
    } catch (error) {
        if (error.message === "Book not found") {
            return res.status(404).json({
                message: error.message
            });
        }

        if (error.message === "Page number must be a positive integer") {
            return res.status(400).json({
                message: error.message
            });
        }

        console.error("Error saving reading bookmark:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Get reading bookmark
async function getBookmark(req, res) {
    try {
        const { id } = req.params;

        const bookmark = await readingBookmarkService.getBookmark(
            req.user.id,
            id
        );

        res.status(200).json({
            message: "Reading bookmark retrieved successfully",
            bookmark: bookmark || null
        });
    } catch (error) {
        if (error.message === "Book not found") {
            return res.status(404).json({
                message: error.message
            });
        }

        console.error("Error getting reading bookmark:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Delete reading bookmark
async function deleteBookmark(req, res) {
    try {
        const { id } = req.params;

        await readingBookmarkService.removeBookmark(
            req.user.id,
            id
        );

        res.status(200).json({
            message: "Reading bookmark deleted successfully"
        });
    } catch (error) {
        if (
            error.message === "Book not found" ||
            error.message === "Bookmark not found"
        ) {
            return res.status(404).json({
                message: error.message
            });
        }

        console.error("Error deleting reading bookmark:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    saveBookmark,
    getBookmark,
    deleteBookmark
};