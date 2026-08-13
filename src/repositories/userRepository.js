// userRepository.js

const db = require("../config/db");

// Function to find a user by email
async function findByEmail(email) {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows[0];
}

// Function to create a new user
async function createUser(name, email, passwordHash) {
    const [result] = await db.query(
        "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
        [name, email, passwordHash]
    );

    return result.insertId;
}

// Function to find a user by ID
async function findById(id) {
    const [rows] = await db.query(
        `SELECT id, name, email, role, created_at, updated_at
         FROM users
         WHERE id = ?`,
        [id]
    );

    return rows[0];
}

module.exports = {
    findByEmail,
    createUser,
    findById
};