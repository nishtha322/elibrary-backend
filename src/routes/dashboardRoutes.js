// dashboardRoutes.js
const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
const { authenticate } = require("../middleware/authMiddleware");

// Get current user's dashboard
router.get(
    "/dashboard",
    authenticate,
    dashboardController.getUserDashboard
);

module.exports = router;