//bookRoutes.js

const express = require("express");
const bookController = require("../controllers/bookController");
const {
    authenticate,
    requireAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();

// Anyone can view and search books
router.get("/", bookController.getBooks);
router.get("/search", bookController.searchBooks);
router.get(
    "/:id/read",
    authenticate,
    bookController.readBook
);
router.get(
    "/:id/download",
    authenticate,
    bookController.downloadBook
);
router.post(
    "/:id/summary",
  
    bookController.generateBookSummary
);
router.get("/:id", bookController.getBookById);

// Only admins can manage books
router.post(
    "/",
    authenticate,
    requireAdmin,
    bookController.createBook
);

router.put(
    "/:id",
    authenticate,
    requireAdmin,
    bookController.updateBook
);

router.delete(
    "/:id",
    authenticate,
    requireAdmin,
    bookController.deleteBook
);

module.exports = router;