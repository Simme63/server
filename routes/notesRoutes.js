const express = require("express")
const router = express.Router();
const notesController = require("../controllers/notesController")

//*GET
router.get("/", notesController.getNotes)
router.get("/:id", notesController.getNoteById)

//>POST
router.post("/", notesController.createNote)

//!DELETE
router.delete("/:id", notesController.deleteNote)

//*PATCH
router.patch("/:id", notesController.updateNote)

module.exports = router