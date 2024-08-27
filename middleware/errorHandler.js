// Import 
const { constants } = require("../constants");

// Define the custom error handler middleware
const errorHandler = (err, req, res, next) =>{
    // set the status code based on the error or default to 500
    const statusCode = res.statusCode ? res.statusCode : 500;

    // Use a switch-case to handle different type of error
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.status(statusCode).json({
                errorCode: statusCode,
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        
        case constants.UNAUTHORIZED:
            res.status(statusCode).json({
                errorcode: statusCode,
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.FORBIDDEN:
            res.status(statusCode).json({
                errorCode: statusCode,
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.NOT_FOUND:
            res.status(statusCode).json({
                errorCode: statusCode,
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case constants.SERVER_ERROR:
            res.status(statusCode).json({
                errorCode: statusCode,
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
    
        default:
            res.status(statusCode).json({
                errorCode: statusCode,
                title: "Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
    }
};

// Export the errorHandler middleware
module.exports = errorHandler;