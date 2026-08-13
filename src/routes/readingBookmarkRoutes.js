// readingBookmarkRoutes.js
const express = require("express");
const router = express.Router();

const readingBookmarkController = require("../controllers/readingBookmarkController");
const { authenticate } = require("../middleware/authMiddleware");

// Save/update reading bookmark
router.put(
    "/books/:id/bookmark",
    authenticate,
    readingBookmarkController.saveBookmark
);

// Get reading bookmark
router.get(
    "/books/:id/bookmark",
    authenticate,
    readingBookmarkController.getBookmark
);

// Delete reading bookmark
router.delete(
    "/books/:id/bookmark",
    authenticate,
    readingBookmarkController.deleteBookmark
);

module.exports = router;