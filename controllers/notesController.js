const Notes = require("../models/notesSchema")

const getNotes = async (req, res) => {
    try {
        const user = req.user;
        console.log(`User: ${JSON.stringify(user)}`);

        const notes = await Notes.find({ userId: user.id });
        res.status(200).json(notes)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getNoteById = async (req, res) => {
    const { id } = req.params
    try {
        const note = await Notes.findById(id)
        console.log(req.params.id);

        if (!note || note.length === 0) {
            res.status(404).json("Note not found")
        } else {
            res.status(200).json(note)
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createNote = async (req, res) => {
    const { title, userId, description } = req.body
    try {
        const note = new Notes({
            title: title,
            userId: userId,
            description: description
        })
        const newNote = await note.save()
        res.status(201).json(newNote)
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
}

const deleteNote = async (req, res) => {
    try {
        const noteToDelete = await Notes.findByIdAndDelete({ _id: req.params.id })

        if (!noteToDelete) {
            res.status(404).json("Note not found")
        }
        res.status(200).json({ message: "Note deleted:", noteToDelete })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}


// const updateNote = async (req, res) => {
//     try {
//         const note = await Notes.findById({ _id: req.params.id })
//         if (!note) {
//             res.status(404).json("User not found")
//         }

//         note.title = req.body.title || note.title
//         note.description = req.body.description || note.description

//         const updatedNote = await note.save()
//         if (!updatedNote) {
//             res.status(400).json("User not updated")
//         }
//         res.status(200).json({ message: "User updated successfully", updateNote })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json(error)
//     }
// }

const updateNote = async (req, res) => {
    try {
        // Find the note by ID
        const note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" }); // Early return
        }

        // Update fields only if provided in the request body
        note.title = req.body.title || note.title;
        note.description = req.body.description || note.description;

        // Save the updated note
        const updatedNote = await note.save();

        res.status(200).json({
            message: "Note updated successfully",
            note: updatedNote, // Include the updated note in the response
        });
    } catch (error) {
        console.error("Error updating note:", error); // Improved logging
        res.status(500).json({ message: "Internal Server Error", error });
    }
};



module.exports = {
    getNotes,
    getNoteById,
    createNote,
    deleteNote,
    updateNote
}