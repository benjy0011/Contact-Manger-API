// Import Router from express
const { Router } = require("express");
const router = Router();

// Import contact controllers
const { getContacts, createContact, getContact, updateContact, deleteContact } = require("../controllers/contactController");

// Import validateToken middleware 
const validateToken = require("../middleware/validateTokenHandler");

// Use the validateToken middleware for all contact routes
router.use(validateToken);

// Define the route for get all contacts
router.get("/", getContacts);

// Define the route for create contact
router.post("/", createContact);

// Define the route for get contact with :id
router.get("/:id", getContact);

// Define the route for update contact with :id
router.put("/:id", updateContact);

// Define the route for delete contact with :id
router.delete("/:id", deleteContact);

module.exports = router;