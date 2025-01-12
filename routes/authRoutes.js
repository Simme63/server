const express = require("express")
const authController = require("../controllers/authController")
const router = express.Router();

//*POST
router.post("/login", authController.login)
router.post("/register", authController.registerUser)

module.exports = router