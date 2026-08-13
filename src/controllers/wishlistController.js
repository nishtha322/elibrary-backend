const wishlistService = require("../services/wishlistService");

// Add book to wishlist
async function addToWishlist(req, res) {
    try {
        const { id } = req.params;

        const wishlistItem = await wishlistService.addToWishlist(
            req.user.id,
            id
        );

        res.status(201).json({
            message: "Book added to wishlist successfully",
            wishlistItem
        });
    } catch (error) {
        if (error.message === "Book not found") {
            return res.status(404).json({
                message: error.message
            });
        }

        if (error.message === "Book already in wishlist") {
            return res.status(409).json({
                message: error.message
            });
        }

        console.error("Error adding book to wishlist:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Get user's wishlist
async function getUserWishlist(req, res) {
    try {
        const wishlist = await wishlistService.getUserWishlist(
            req.user.id
        );

        res.status(200).json({
            message: "Wishlist retrieved successfully",
            wishlist
        });
    } catch (error) {
        console.error("Error getting wishlist:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

// Remove book from wishlist
async function removeFromWishlist(req, res) {
    try {
        const { id } = req.params;

        await wishlistService.removeFromWishlist(
            req.user.id,
            id
        );

        res.status(200).json({
            message: "Book removed from wishlist successfully"
        });
    } catch (error) {
        if (
            error.message === "Book not found" ||
            error.message === "Book not in wishlist"
        ) {
            return res.status(404).json({
                message: error.message
            });
        }

        console.error("Error removing book from wishlist:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    addToWishlist,
    getUserWishlist,
    removeFromWishlist
};