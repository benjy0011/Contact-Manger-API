// Import libraries
const asyncHandler = require("express-async-handler");
const bcrypt =  require("bcrypt"); // Hashing
const jwt = require("jsonwebtoken") // Library for creating JWT tokens
const User = require("../models/userModel"); // User model


/**
 * Register a user
 * @route POST /api/users/register
 * @access public
 */
const registerUser = asyncHandler(async (req, res) => {
    // Destruct only username, email & password from request body
    const { username, email, password } = req.body;

    // Check if all thr required fields are provided
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    };

    // Check if the user already exists in the database by email
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!");
    };

    // Hash the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document in the database
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    // If user creation is successful, respond with the user's ID and email
    if (user) {
        res.status(201).json({ _id: user._id, email: user.email, message: "User created successfully" });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

/**
 * Login a user
 * @route POST /api/users/login
 * @access public
 */
const loginUser = asyncHandler(async (req, res) => {
    // Destruct email and password from the request body
    const { email, password } = req.body;

    // Check if the user exists in the database by email
    const user = await User.findOne({ email });

    // Compare the provided password with the hashed password in database
    if (user && (await bcrypt.compare(password, user.password))) {
        // Generate a JWT token for the authenticated user
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user._id, // Attach User ID from the database
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );
        // Respond with the generated JWT token
        res.status(200).json({ accessToken }); // Send token to the client
    } else {
        res.status(401);
        throw new Error("Email of password is not valid");
    }
});

/**
 * Get current user info
 * @route GET /api/users/current
 * @access Private
 */
const currentUser = asyncHandler(async (req, res) => {
    // Respond with the current user's information, already available in req.user
    res.json(req.user);
});

// Export all the user controllers
module.exports = { registerUser, loginUser, currentUser };