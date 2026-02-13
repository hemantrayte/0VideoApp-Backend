// Custom API Response class to standardize successful responses
class ApiResponse {
  constructor(
    statusCode,                 // HTTP status code (e.g., 200, 201)
    data,                       // Actual response data
    message = "Success"         // Default success message
  ) {
    // Store HTTP status code
    this.statusCode = statusCode;

    // Data returned from controller (user, videos, comments, etc.)
    this.data = data;

    // Custom or default success message
    this.message = message;

    // success is true if status code is less than 400
    this.success = statusCode < 400;
  }
}

export { ApiResponse };


// class ApiResponse {
//   constructor(stausCode, data, message = "Sucess") {
//     this.stausCode = stausCode;
//     this.data = data;
//     this.message = message;
//     this.success - stausCode < 400;
//   }
// }

// export { ApiResponse };
