//categoryRoutes.js

const express = require("express");
const categoryController = require("../controllers/categoryController");
const {authenticate, requireAdmin} = require("../middleware/authMiddleware");
const router = express.Router();
router.get("/", categoryController.getAllCategories);
router.post("/", authenticate, requireAdmin, categoryController.createCategory);
router.delete("/:id", authenticate, requireAdmin, categoryController.deleteCategory);
module.exports = router;