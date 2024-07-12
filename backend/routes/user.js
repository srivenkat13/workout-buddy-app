const express = require("express");
const { loginUser, signupUser, getUserData } = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");
const updateStreak = require("../middleware/updateStreak");

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/userdata",requireAuth,updateStreak,getUserData)

module.exports = router;
