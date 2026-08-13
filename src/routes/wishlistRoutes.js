// wishlistRoutes.js
const express = require("express");
const router = express.Router();

const wishlistController = require("../controllers/wishlistController");
const { authenticate } = require("../middleware/authMiddleware");

// Add book to wishlist
router.post(
    "/books/:id/wishlist",
    authenticate,
    wishlistController.addToWishlist
);

// Get current user's wishlist
router.get(
    "/wishlist",
    authenticate,
    wishlistController.getUserWishlist
);

// Remove book from wishlist
router.delete(
    "/books/:id/wishlist",
    authenticate,
    wishlistController.removeFromWishlist
);

module.exports = router;