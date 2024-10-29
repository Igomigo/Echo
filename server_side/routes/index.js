const express = require("express");
const registerUser = require("../controllers/registerUser");
const checkEmail = require("../controllers/checkEmail");
const checkPassword = require("../controllers/checkPassword");
const logout = require("../controllers/logout");
const updateUserDetails = require("../controllers/updateUserDetails");
const userDetails = require("../controllers/userDetails");
const searchUser = require("../controllers/searchUser");
//const getAiConversation = require("../controllers/getAiConversation");
//const chatWithEcho = require("../controllers/aiChat");

//const profile = require("../controllers/userAccount");
//const authWare = require("../middlewares/authWare");

const router = express.Router();

//create user api
router.post('/register',registerUser);

//check user email
router.post('/email',checkEmail);

//check user password
router.post('/password',checkPassword);

//login user details
router.get('/user-details',userDetails);

//logout user
router.get('/logout',logout);

//update user details
router.post('/update-user',updateUserDetails);

// Search User
router.post("/search-user", searchUser);

// Chat with Echo AI
//router.post("/echo/chat", chatWithEcho);

// Get AI conversation
//router.get("/echo/conversation", getAiConversation);


module.exports = router;