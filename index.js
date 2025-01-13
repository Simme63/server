const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dbConnect = require("./utils/dbConnect.js"); // Centralized database connection logic
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const notesRoutes = require("./routes/notesRoutes.js");
const authMiddleware = require("./middleware/authMiddleware.js")

// Port to bind the app to
const PORT = process.env.PORT || 8000; // 8000 is the default port

process.env.NODE_NO_WARNINGS = '1'; // Disable all warnings


dotenv.config(); // Load environment variables
const app = express();

// Database Connection
dbConnect(); // Connects to MongoDB
app.use(cors())
// Middleware
app.use(morgan("dev")); // Logs HTTP requests
// Or, you can specify which origins are allowed, like your React frontend:
app.use(cors({
  origin: "https://client-hknlo60xz-simme63s-projects.vercel.app/",  // The URL of your deployed React app
  methods: "GET,POST,PUT,DELETE",               // Allow the necessary methods
  allowedHeaders: "Content-Type,Authorization",  // Allow specific headers
}));

app.use(express.json()); // Parses incoming JSON requests

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the start page of the API");
});
app.use("*", authMiddleware); // Global middleware for authentication
app.use("/api/users", userRoutes); // User-related routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/notes", notesRoutes); // Notes-related routes

app.options(cors()); // Enable pre-flight

// Export the app for deployment
module.exports = app;
