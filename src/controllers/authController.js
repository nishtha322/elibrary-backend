//authController.js

const authService = require("../services/authService");

// Controller function for user registration
async function register(req, res) {

    try{
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({ 
                message: "Name, email, and password are required" 
            });
        }

        // Password validation
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if(!passwordRegex.test(password)){
            return res.status(400).json({
                message:
                "Password must be at least 8 characters and contain uppercase, lowercase, number and special character"
            });
        }

        const user = await authService.registerUser(name, email, password);

        res.status(201).json({ 
            message: "User registered successfully", 
            user 
        });

    } catch (error) {
        if(error.message === "User already exists"){
            return res.status(409).json({ message: error.message });
        }

        res.status(500).json({ message: "Internal server error" });
    }
}


async function login(req, res) {
    try{
        const {email, password}=req.body;
        if(!email ||  !password){
            return res.status(400).json({ message: "Email and password are required" });

        }
        const result=await authService.loginUser(email, password);
        res.status(200).json({ message: "Login successful", token: result.token, user: result.user });
    } catch (error) {
         if(error.message === "Invalid email or password"){
           return res.status(401).json({ message: error.message });
        }
        res.status(500).json({ message: "Internal server error" });

    }
}

async function getMe(req, res) {
    try{
        const user=await authService.getUserById(req.user.id);
        if(!user){

            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User found", user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
    
module.exports = {
    register,
    login,
    getMe
};