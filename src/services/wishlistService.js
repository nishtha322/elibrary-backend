// wishlistService.js
const wishlistRepository = require("../repositories/wishlistRepository");
const bookRepository = require("../repositories/bookRepository");

// Add a book to wishlist
async function addToWishlist(userId, bookId) {
    const book = await bookRepository.findBookById(bookId);

    if (!book) {
        throw new Error("Book not found");
    }

    const existingItem = await wishlistRepository.findWishlistItem(
        userId,
        bookId
    );

    if (existingItem) {
        throw new Error("Book already in wishlist");
    }

    const wishlistId = await wishlistRepository.addToWishlist(
        userId,
        bookId
    );

    return wishlistRepository.findWishlistItem(
        userId,
        bookId
    );
}

// Get user's wishlist
async function getUserWishlist(userId) {
    return wishlistRepository.getUserWishlist(userId);
}

// Remove a book from wishlist
async function removeFromWishlist(userId, bookId) {
    const book = await bookRepository.findBookById(bookId);

    if (!book) {
        throw new Error("Book not found");
    }

    const existingItem = await wishlistRepository.findWishlistItem(
        userId,
        bookId
    );

    if (!existingItem) {
        throw new Error("Book not in wishlist");
    }

    await wishlistRepository.removeFromWishlist(
        userId,
        bookId
    );
}

module.exports = {
    addToWishlist,
    getUserWishlist,
    removeFromWishlist
};