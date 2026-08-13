//categoryRepository.js

const db=require("../config/db");
//get all categories

async function getAllCategories(){
    const [rows]=await db.query("SELECT * FROM categories");
    return rows;
}
//Find category by id
async function findCategoryById(id){
    const [rows]=await db.query("SELECT * FROM categories WHERE id=?",[id]);
    return rows[0];
}

//Find category by name
async function findCategoryByName(name){
    const [rows]=await db.query("SELECT * FROM categories WHERE name=?",[name]);
    return rows[0];
}

//create a new category
async function createCategory(name, description){
    const [result]=await db.query("INSERT INTO categories (name,description) VALUES (?,?)",[name, description]);
    return result.insertId;
}
//delete a category by id
async function deleteCategoryById(id){
    const [result]=await db.query("DELETE FROM categories WHERE id=?",[id]);
    return result.affectedRows>0;
}

module.exports={
    getAllCategories,
    findCategoryById,   
    findCategoryByName,
    createCategory,
    deleteCategoryById
}