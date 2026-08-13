//authRoutes.js

const express = require('express');
const authController = require("../controllers/authController");
const {authenticate} = require("../middleware/authMiddleware");
const router = express.Router();

// Register a new user
router.post("/register", authController.register);
// Login a user
router.post("/login", authController.login);
// Get the authenticated user's information
router.get("/me", authenticate, authController.getMe);

module.exports = router;