// Custom API Error class to standardize error responses
class ApiError extends Error {
  constructor(
    statusCode,                 // HTTP status code (e.g., 400, 404, 500)
    message = "Something went wrong", // Default error message
    errors = [],                // Additional error details (validation errors etc.)
    stack = ""                  // Optional custom stack trace
  ) {
    // Call parent Error class constructor
    super(message);

    // HTTP status code
    this.statusCode = statusCode;

    // No data in error response
    this.data = null;

    // Indicates request failed
    this.success = false;

    // Array of detailed errors
    this.errors = errors;

    // If custom stack provided, use it
    if (stack) {
      this.stack = stack;
    } else {
      // Otherwise capture current stack trace
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };



// class ApiError extends Error {
//   constructor(
//     statusCode,
//     message = "Something went wrong",
//     errors = [],
//     statck = ""
//   ) {
//     super(message);
//     this.statusCode = statusCode;
//     this.data = null;
//     this.message = message;
//     this.sucess = false;
//     this.errors = errors;

//     if (statck) {
//       this.stack = statck;
//     } else {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
// }

// export { ApiError };
