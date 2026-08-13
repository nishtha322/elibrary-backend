//categroyController.js

const categoryService = require("../services/categoryService");

// get all categories
async function getAllCategories(req, res) {
    try {
        const categories = await categoryService.getCategories();
        res.status(200).json({ message: "Categories retrieved successfully", categories });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// create a new category
async function createCategory(req, res) {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ message: "Name and description are required" });
        }
        const category = await categoryService.createCategory(name, description);
        res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// delete a category
async function deleteCategory(req, res) {
    try {
        const { id } = req.params;
        await categoryService.removeCategory(id);
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = {
    getAllCategories,
    createCategory,
    deleteCategory
};