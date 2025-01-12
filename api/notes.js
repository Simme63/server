const app = require("../index.js")
const express = require("express")
const serverless = require("serverless-http")
const notesController = require("../controllers/notesController")
const router = express.Router()

router.get("/", notesController.getNotes)
router.get("/:id", notesController.getNoteById)
router.post("/", notesController.createNote)
router.patch("/:id", notesController.updateNote)
router.delete("/:id", notesController.deleteNote)

module.exports = serverless(app)