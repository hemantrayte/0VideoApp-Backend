// Import User model to fetch authenticated user
import { User } from "../models/user.model.js";

// Custom error class for API errors
import { ApiError } from "../utils/ApiError.js";

// Utility to handle async errors without try-catch repetition
import { asyncHandler } from "../utils/asyncHandler.js";

// JWT library for token verification
import jwt from "jsonwebtoken";

/**
 * verifyJWT Middleware
 * -------------------
 * Protects routes by validating the access token
 * and attaching the authenticated user to req.user
 */
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    /**
     * Extract access token from:
     * 1. Cookies (preferred for browser-based auth)
     * 2. Authorization header (Bearer token)
     */
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // If token is missing, deny access
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    /**
     * Verify JWT and decode payload
     */
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    /**
     * Fetch user from database using decoded token data
     * Exclude sensitive fields like password & refreshToken
     */
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    // If user does not exist, token is invalid
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    /**
     * Attach authenticated user to request object
     * This allows access in controllers via req.user
     */
    req.user = user;

    // Pass control to next middleware/controller
    next();
  } catch (error) {
    // Handle token expiration or verification errors
    throw new ApiError(401, error.message || "Invalid Access Token");
  }
});


// import { User } from "../models/user.model.js";
// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import jwt from "jsonwebtoken";

// export const verifyJWT = asyncHandler(async (req, res, next) => {
//   try {
    
//     const token =
//       req.cookies?.accessToken ||
//       req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//       throw new ApiError(401, "Unauthorized request");
//     }

//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     const user = await User.findById(decodedToken?._id).select(
//       "-password -refreshToken"
//     );

//     if (!user) {
//       throw new ApiError(401, "Invaild Aceess Token");
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     throw new ApiError(401, error.message || "Invaild Aceess Token");
//   }
// });

