const auth = require("../controllers/auth");
const express = require("express");

const router = express.Router();

// Create User API
router.post("/register", auth.register);

module.exports = router;