// dashboardService.js

const dashboardRepository = require("../repositories/dashboardRepository");

async function getUserDashboard(userId) {
    const [
        statistics,
        recentDownloads,
        bookmarks,
        wishlist,
        recentHighlights
    ] = await Promise.all([
        dashboardRepository.getDashboardStats(userId),
        dashboardRepository.getRecentDownloads(userId),
        dashboardRepository.getBookmarks(userId),
        dashboardRepository.getWishlist(userId),
        dashboardRepository.getRecentHighlights(userId)
    ]);

    return {
        statistics,
        recentDownloads,
        bookmarks,
        wishlist,
        recentHighlights
    };
}

module.exports = {
    getUserDashboard
};