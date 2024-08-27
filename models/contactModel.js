// Impoer mongoose
const mongoose = require("mongoose");

// Define the contact schema
const contactSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, // An ObjectId will be automatically given to a new document created, just parse in user._id when creating a new contact
            ref: "User", // Reference to "User" model
            required: true,
        },
        name: {
            type: String,
            required: [true, "Please add the contact name"],
        },
        email: {
            type: String,
            required: [true, "Please add the contact email address"],
        },
        phone: {
            type: String,
            require: [true, "Please add the contact phone number"],
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

// Export the contact model based on the schema
const contactModel = mongoose.model("Contact", contactSchema);
module.exports = contactModel;