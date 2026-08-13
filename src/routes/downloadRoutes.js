// downloadRoutes.js

const express = require("express");
const downloadController = require("../controllers/downloadController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/",
    authenticate,
    downloadController.getDownloadHistory
);

module.exports = router;