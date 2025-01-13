const app = require("../index.js")
const express = require("express")
const serverless = require("serverless-http")
const authController = require("../controllers/authController")
const router = express.Router()

router.get("/", authController.registerUser)
router.post("/", authController.login)


module.exports = serverless(app)