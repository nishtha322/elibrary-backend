// dashboardController.js
const dashboardService = require("../services/dashboardService");

async function getUserDashboard(req, res) {
    try {
        const dashboard = await dashboardService.getUserDashboard(
            req.user.id
        );

        res.status(200).json({
            message: "User dashboard retrieved successfully",
            dashboard
        });
    } catch (error) {
        console.error("Error getting user dashboard:", error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    getUserDashboard
};