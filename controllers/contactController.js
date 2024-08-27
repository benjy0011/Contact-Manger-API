// Import
const Contact = require("../models/contactModel") // contact model
const asyncHandler = require("express-async-handler"); // asyncHandler

/** 
 * Get all contacts
 * @route GET /api/contacts
 * @access private
 */
const getContacts = asyncHandler(async (req, res) => {
    // Find all the contacts belong to the login user
    const contacts = await Contact.find({ user: req.user.id });
    // Respond with the list of contacts
    res.status(200).json(contacts);
});

/**
 * Create new contact
 * @route POST /api/contacts
 * @access private
 */
const createContact = asyncHandler(async (req,res) => {
    // Destruct name, email, and phone from the request body
    const { name, email, phone }= req.body;

    // Check if all required fields are provided
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    };

    // Create a new contact document in the database with the logged-in user's id
    const newContact = await Contact.create({
        user: req.user.id,
        name,
        email,
        phone,
    });

    // Respond with the created contact
    res.status(201).json(newContact);
});

/**
 * Get contact with :id
 * @route GET /api/contacts/:id
 * @access private
 */
const getContact = asyncHandler(async (req, res) => {
    // Get the contact with :id and user.id
    const contact = await Contact.findOne({ _id: req.params.id, user: req.user.id });

    // If the contact doesn't exist, respond with a 404 status
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    // If the contact exists, respond with the contact data
    res.status(200).json(contact);
});

/**
 * Update contact by :id
 * @route PUT /api/contacts/:id
 * @access private
 */
const updateContact = asyncHandler(async (req, res) => {
    // Update the contact document with the provided data
    const updatedContact = await Contact.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id }, 
        { $set: req.body }, 
        { new: true, }, // return the updated document instead of the old one
    );

    // Throw an error if contact can't be found or unauthorised
    if (!updateContact) {
        res.status(404);
        throw new Error("Contact not found");
    };

    // Respond with the updated contact
    res.status(200).json(updatedContact);
});

/**
 * Delete a contact by :id
 * @route DELETE /api/contacts/:id
 * @access private
 */
const deleteContact = asyncHandler(async (req, res) => {
    // Delete the contact by :id and user.id
    const deletedContact = await Contact.findOneAndDelete(
        { _id: req.params.id, user: req.user.id },  
    );

    // Throw an error if contact isn't found or unauthorised
    if (!deletedContact) {
        res.status(404);
        throw new Error("Contact not found");
    };

    // Respond with the deleted contact data
    res.status(200).json(deletedContact)
});

// export all the contact controllers function
module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
};