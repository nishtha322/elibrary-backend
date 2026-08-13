// highlightRoutes.js
const express = require("express");
const router = express.Router();

const highlightController = require("../controllers/highlightController");
const { authenticate } = require("../middleware/authMiddleware");

// Create a highlight for a book
router.post(
    "/books/:id/highlights",
    authenticate,
    highlightController.createHighlight
);

// Get all highlights for a book
router.get(
    "/books/:id/highlights",
    authenticate,
    highlightController.getHighlights
);

// Update a highlight
router.put(
    "/highlights/:highlightId",
    authenticate,
    highlightController.updateHighlight
);

// Delete a highlight
router.delete(
    "/highlights/:highlightId",
    authenticate,
    highlightController.deleteHighlight
);

module.exports = router;