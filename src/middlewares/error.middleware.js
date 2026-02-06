
// Global Error Handling Middleware
import { ApiResponse } from "../utils/ApiResponse.js";

/**
 * errorHandler Middleware
 * ----------------------
 * Catches all errors thrown in the application
 * and sends a standardized error response
 */
export const errorHandler = (err, req, res, next) => {
  /**
   * Log full error details for debugging
   * (In production, this should be logged using a logger like Winston)
   */
  console.error(err);

  /**
   * Determine HTTP status code
   * Defaults to 500 if not explicitly provided
   */
  const statusCode = err.statusCode || 500;

  /**
   * Error message to be sent to the client
   */
  const message = err.message || "Internal Server Error";

  /**
   * Send consistent error response structure
   */
  res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    errors: err.errors || [],
    data: null,
  });
};


// // middlewares/error.middleware.js
// import { ApiResponse } from "../utils/ApiResponse.js";

// export const errorHandler = (err, req, res, next) => {
//   console.error(err); // logs stack trace

//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";

  
//   res.status(statusCode).json({
//     statusCode,
//     success: false,
//     message,
//     errors: err.errors || [],
//     data: null,
//   });
// };
