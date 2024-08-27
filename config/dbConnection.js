// importing Mongoose library to connect to MongoDB
const mongoose = require("mongoose");

// Function to connect to MongoDB using Mongoose
const connectDB = async () => {
    try {
        // Attempting to connect using the connection string (generated on MongoDB website) from .env file
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)

        // Log a success message with the host and databse name
        console.log(`Database connected: ${connect.connection.host} ${connect.connection.name}`);
    } catch (error) {
        // Log the error message if connections fails
        console.error(error);
        // Exit the process with a failure status
        process.exit(1);
    }
};

module.exports = connectDB;