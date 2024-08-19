const express = require("express");
const auth = require("../controllers/auth");
const profile = require("../controllers/userAccount");
const authWare = require("../middlewares/authWare");

const router = express.Router();

// Create User API
router.post("/register", auth.register);

// Login API
router.post("/login", auth.login);

// User account data API
router.get("/profile", authWare, profile.userDetails);

// Update user details API
router.post("/profile/update", authWare, profile.updateDetails);

module.exports = router;