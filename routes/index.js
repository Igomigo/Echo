const express = require("express");
const auth = require("../controllers/auth");
const userDetails = require("../controllers/userAccount");
const authWare = require("../middlewares/authWare");

const router = express.Router();

// Create User API
router.post("/register", auth.register);

// Login API
router.post("/login", auth.login);

// User account data API
router.get("/profile", authWare, userDetails);

module.exports = router;