const dotenv = require("dotenv")
const mongoose = require("mongoose")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const dbConnect = require("./utils/dbConnect.js")
const authRoutes = require("./routes/authRoutes.js")
const userRoutes = require("./routes/userRoutes.js")
const notesRoutes = require("./routes/notesRoutes.js")
const authMiddleware = require("./middleware/authMiddleware.js")
const app = express()
dbConnect()
const PORT = process.env.PORT || 8000
dotenv.config()

mongoose.connect(process.env.MONGO_URI, {})
const db = mongoose.connection
db.on("error", (error) => console.log(`Error`))
db.once("open", () => console.log(`Connected to MongoDB`))

app.use(morgan('dev'));
app.use(cors());
app.use(express.json())
app.get('/', (req, res) => {
  res.send("Welcome to the start page of the api");
});
app.use("*", authMiddleware)

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/notes", notesRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("API is running")
})

module.exports = app