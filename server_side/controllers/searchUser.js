const User = require("../models/user");

const searchUser = async (req, res) => {
    try {
        const { data } = req.body;
        const query = new RegExp(data, "i", "g");
        
        const user = await User.find({
            $or: [
                { name: query },
                { email: query }
            ]
        });

        return res.status(404).json({
            success: true,
            message: "Successful",
            data: user
        });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            error: true,
            message: err.message || err
        });
    }
}

module.exports = searchUser;