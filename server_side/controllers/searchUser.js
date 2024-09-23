const User = require("../models/user");

const searchUser = async (req, res) => {
    try {
        const { data } = req.body;
        const query = new RegExp(data, "i");
        
        const user = await User.find({
            $or: [
                { name: query },
                { email: query }
            ]
        }).select("-password");

        return res.status(200).json({
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