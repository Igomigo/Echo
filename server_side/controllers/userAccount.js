// Returns user account info
exports.userDetails = async (req, res) => {
    // Returns a user account detail
    const current_user = req.current_user;
    if (current_user) {
        return res.status(200).json({
            current_user
        });
    }
}

exports.updateDetails = async (req, res) => {
    // Update user details
    try {
        const current_user = req.current_user;
        const data = req.body;

        // Create an array of allowed updates fields
        const allowedUpdates = ["name", "email", "profile_pic"];

        // extract keys from the body data
        const keys = Object.keys(data);

        // Check that the keys are the allowed
        const isValid = keys.every(key => allowedUpdates.includes(key));

        if (!isValid) {
            return res.status(400).json({
                message: "Invalid updates!",
                error: true
            });
        }

        keys.forEach(key => current_user[key] = data[key]);
        current_user.updatedAt = Date.now();

        await current_user.save();

        return res.status(200).json({
            message: "User details updated successfully",
            user: current_user,
            success: true
        });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({
            message: "An error occurred while updating user details",
            error: err
        });
    }
}