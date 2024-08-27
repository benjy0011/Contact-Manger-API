// Import express
const express = require("express");

// Import the dotenv module and load environment variables from the .env file
const dotenv = require("dotenv").config();

// Initialize the express application 
const app = express();

// Use the express.json() middleware to parse JSON request bodies
app.use(express.json());

// Import the routes
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");

// Import the database connection function and establish a connection to MongoDB
const connectDB = require("./config/dbConnection");
connectDB();

// Import the error handling middleware
const errorHandler = require("./middleware/errorHandler");


// Define the port from .env or default to 3000
const port = process.env.PORT || 3000;

// Use the custom errorHandler middleware
app.use(errorHandler);

// Set up the routes for users and contacts
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});