// Import the jsonwebtoken library to verify JWT tokens
const jwt = require("jsonwebtoken");

// Define the middleware function to validate JWT tokens
const validateToken = (req, res, next) => {
    let token;

    // Check if the authorization header is present and starts with "Bearer"
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        // Extract the token from the authorization header
        token = authHeader.split(" ")[1];

        // Verify the token using the secret key
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // If there's an error during verification, respond with an unauthorized status
                res.status(401);
                throw new Error("User is not authorized");
            }

            // If the token is valid, attach the decoded user information to the request object
            req.user = decoded.user;
            next(); // Proceed to the next middleware or route handler
        });
    } else {
        // If the authorization header is missing or malformed, respond with unauthorized status
        res.status(401);
        throw new Error("User is not authorized or the token is missing");
    }
};

// Export the validateToken middleware function
module.exports = validateToken;