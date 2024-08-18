const message = require("../models/message");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    // Handles user signup operation
    try {
        const {name, email, password, profile_pic} = req.body;

        const checkEmail = await User.findOne({email: email});

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
            name, password, password: hashedPwd, profile_pic
        }
        const user = new User(payload);
        const savedUser = await user.save();

        return res.status(201).json({
            message: "User created successfully",
            user: savedUser,
            success: true
        });
    } catch (err) {
        console.log("Error:", err);
        return res.status(500).json({"error": err});
    }
}