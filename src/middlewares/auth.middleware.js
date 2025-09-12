import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")


    if (!token) {
      throw new ApiError(401, "Unauthorized request")
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

    if (!user) {
      throw new ApiError(401, "Invaild Aceess Token")
    }

    req.user = user
    next()

  } catch (error) {
    throw new ApiError(401, error.message || "Invaild Aceess Token")
  }
})

// import { User } from "../models/user.model.js";
// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import jwt from "jsonwebtoken";

// export const verifyJWT = asyncHandler(async (req, res, next) => {
//   try {
//     // get token from cookie or header
//     const token =
//       req.cookies?.accessToken ||
//       req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//       throw new ApiError(401, "Unauthorized request");
//     }

//     // verify token
//     let decodedToken;
//     try {
//       decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     } catch (err) {
//       throw new ApiError(401, "Invalid or expired token");
//     }

//     // check user in DB
//     const user = await User.findById(decodedToken?._id).select(
//       "-password -refreshToken"
//     );

//     if (!user) {
//       throw new ApiError(401, "Invalid Access Token - user not found");
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     next(new ApiError(401, error.message || "Invalid Access Token"));
//   }
// });
