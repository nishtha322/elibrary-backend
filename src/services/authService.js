//authService.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

async function registerUser(name, email, password) {
    // Check if the user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
        throw new Error("User already exists");
    }

    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create the new user
    const userId = await userRepository.createUser(name, email, passwordHash);
    return {
        id:userId,
        name,
        email,
        role:"user"
    };
}

async function loginUser(email, password) {
    // Find the user by email
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
        throw new Error("Invalid email or password");
    }
    // Generate a JWT token
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

async function getUserById(id) {
    return userRepository.findById(id);}

module.exports = {
    registerUser,
    loginUser,
    getUserById
};