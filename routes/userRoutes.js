// Import Router from express
const { Router } = require("express");
const router = Router();

// Import the user controllers
const { registerUser, loginUser, currentUser } = require("../controllers/userController");

// Import the validateToken middleware
const validateToken = require("../middleware/validateTokenHandler");

// Define the route for user registration
router.post("/register", registerUser);

// Define the route for user login
router.post("/login", loginUser);

// Define the route for getting current user info, protected
router.get("/current", validateToken, currentUser);

// Export the user router
module.exports = router;