//categoryService.js

const categoryRepository = require("../repositories/categoryRepository");

// Get all categories
async function getCategories() {
    return categoryRepository.getAllCategories();
}

// Create a new category
async function createCategory(name, description) {
    // Check if the category already exists
    const existingCategory = await categoryRepository.findCategoryByName(name);
    if (existingCategory) {
        throw new Error("Category already exists");
    }
    const categoryId = await categoryRepository.createCategory(name, description || null);
    return categoryRepository.findCategoryById(categoryId);
}

// Delete a category by ID
async function removeCategory(id) {
    const category = await categoryRepository.findCategoryById(id); 
    if (!category) {
        throw new Error("Category not found");
    }
    await categoryRepository.deleteCategoryById(id);
}

module.exports = {
    getCategories,
    createCategory,
    removeCategory
};