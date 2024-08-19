const express = require("express");
const auth = require("../controllers/auth");

const router = express.Router();

// Create User API
router.post("/register", auth.register);

module.exports = router;