const app = require("../index.js")
const express = require("express")
const serverless = require("serverless-http")
const userController = require("../controllers/userController")
const router = express.Router()

router.get("/", userController.getUsers)
router.post("/", userController.createUser)
router.patch("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)

module.exports = serverless(app)
