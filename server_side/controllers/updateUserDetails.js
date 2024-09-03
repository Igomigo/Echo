const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/user");

async function updateUserDetails(request,response){
    try {
        const token = request.cookies.token || ""

        const user = await getUserDetailsFromToken(token);

        const { name, profile_pic, email } = request.body;

        const updateUser = await UserModel.updateOne({ _id : user._id },{
            name,
            profile_pic,
            email
        });

        const userInfomation = await UserModel.findById(user._id);

        return response.json({
            message : "user data updated successfully",
            data : userInfomation,
            success : true
        });


    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        });
    }
}

module.exports = updateUserDetails;