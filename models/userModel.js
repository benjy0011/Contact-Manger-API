// Import mongoose
const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,    // Remove the white space from the sides
            unique: true,
            required: [true, "Please add the username"], // Log a required message
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            require: [true, "Please add the user email address"],
            lowercase: true,  
            validate: {
                validator: function (email) {
                    // Using regex
                    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

                    // Test the email against the email regex
                    return emailRegex.test(email);
                },
                message: "Please enter a valid email address",
            }
        },
        password: {
            type: String,
            required: [true, "Please add the user password"],
        },
        timestamp: {
            type: Date,
            default: Date.now, // Automatically set the timestamp to current time
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt timestamps
    }
);

// Export the user model based on the schema
const userModel = mongoose.model("User", userSchema); // Model name is "User"
module.exports = userModel;