// Returns user account info
async function userDetails(req, res) {
    // Returns a user account detail
    const current_user = req.current_user;
    if (current_user) {
        return res.status(200).json({
            current_user
        });
    }
}

module.exports = userDetails;