const message = require("../models/message");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    // Handles user signup operation
    try {
        const { name, email, password, profile_pic } = req.body;

        // Check if password is provided
        if (!password) {
            return res.status(400).json({
                message: "Password is required",
                error: true
            });
        }

        const checkEmail = await User.findOne({ email: email });

        if (checkEmail) {
            return res.status(409).json({
                message: "User already exists",
                error: true
            });
        }

        // Hash password
        const hashedPwd = await bcrypt.hash(password, 10);

        // Create user
        const payload = {
            name, email, password: hashedPwd, profile_pic
        };
        const user = new User(payload);
        const savedUser = await user.save();

        return res.status(201).json({
            message: "User created successfully",
            user: savedUser,
            success: true
        });
    } catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ "error": err });
    }
};

exports.login = async (req, res) => {
    // Logs a user in
    try {
        const {email, password} = req.body;

        // Validate input fields
        if (!email) {
            console.log("email not provided");
            return res.status(400).json({error: "email missing"});
        }
        if (!password) {
            console.log("Password not provided");
            return res.status(400).json({error: "password missing"});
        }

        // Check if user exists
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(404).json({error: "user not found"});
        }

        // Compare password with hashed version
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({error: "invalid password"});
        }

        // Generate a token using jwt
        const token = jwt.sign(
            {userId: user._id}, process.env.JWT_SECRET, {expiresIn: "14d"}
        );

        // Return a response to client
        return res.status(200).json({
            token: token
        });
    } catch (err) {
        console.error(`${err}`);
        res.status(500).json({error: err.message});
    }
}