const express = require("express")
const router = express.Router();
const userController = require("../controllers/userController")

//>POST
router.post("/", userController.createUser)
router.get("/", userController.getUsers)

//!DELETE
router.delete("/:id", userController.deleteUser)

//*PATCH
router.patch("/:id", userController.updateUser)

module.exports = router