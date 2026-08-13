const highlightService = require("../services/highlightService");

// Create a highlight
async function createHighlight(req, res) {
    try {
        const { id } = req.params;
        const {
            pageNumber,
            selectedText,
            note
        } = req.body;

        if (!selectedText || !selectedText.trim()) {
            return res.status(400).json({
                message: "Selected text is required"
            });
        }

        const highlight = await highlightService.createHighlight(
            req.user.id,
            id,
            pageNumber === undefined ? null : Number(pageNumber),
            selectedText,
            note
        );

        res.status(201).json({
            message: "Highlight created successfully",
            highlight
        });
    } catch (error) {
        if (error.message === "Book not found") {
            return res.status(404).json({
                message: error.message
            });
        }

        if (
            error.message === "Selected text is required" ||
            error.message === "Page number must be a positive integer"
        ) {
            return res.status(400).json({
                message: error.message
            });
        }

        console.error("Error creating highlight:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Get all highlights for a book
async function getHighlights(req, res) {
    try {
        const { id } = req.params;

        const highlights = await highlightService.getHighlights(
            req.user.id,
            id
        );

        res.status(200).json({
            message: "Highlights retrieved successfully",
            highlights
        });
    } catch (error) {
        if (error.message === "Book not found") {
            return res.status(404).json({
                message: error.message
            });
        }

        console.error("Error getting highlights:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Update a highlight
async function updateHighlight(req, res) {
    try {
        const { highlightId } = req.params;
        const {
            pageNumber,
            selectedText,
            note
        } = req.body;

        if (!selectedText || !selectedText.trim()) {
            return res.status(400).json({
                message: "Selected text is required"
            });
        }

        const highlight = await highlightService.updateHighlight(
            req.user.id,
            highlightId,
            pageNumber === undefined ? null : Number(pageNumber),
            selectedText,
            note
        );

        res.status(200).json({
            message: "Highlight updated successfully",
            highlight
        });
    } catch (error) {
        if (error.message === "Highlight not found") {
            return res.status(404).json({
                message: error.message
            });
        }

        if (
            error.message === "Selected text is required" ||
            error.message === "Page number must be a positive integer"
        ) {
            return res.status(400).json({
                message: error.message
            });
        }

        console.error("Error updating highlight:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Delete a highlight
async function deleteHighlight(req, res) {
    try {
        const { highlightId } = req.params;

        await highlightService.removeHighlight(
            req.user.id,
            highlightId
        );

        res.status(200).json({
            message: "Highlight deleted successfully"
        });
    } catch (error) {
        if (error.message === "Highlight not found") {
            return res.status(404).json({
                message: error.message
            });
        }

        console.error("Error deleting highlight:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    createHighlight,
    getHighlights,
    updateHighlight,
    deleteHighlight
};