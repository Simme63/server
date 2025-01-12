const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        required: true,
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("Notes", notesSchema)