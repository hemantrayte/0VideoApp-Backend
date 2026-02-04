
// Import Router from Express to create modular route handlers
import { Router } from "express";

// Import user controller functions
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  getWatchHistory,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
} from "../controllers/user.controller.js";

// Multer middleware for handling file uploads
import { upload } from "../middlewares/multer.middleware.js";

// JWT authentication middleware to protect routes
import { verifyJWT } from "../middlewares/auth.middleware.js";

// Initialize router instance
const router = Router();

/**
 * PUBLIC ROUTES
 * -------------
 */

/**
 * Register User
 * - Accepts multipart/form-data
 * - Uploads avatar (required) and cover image (optional)
 */
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

/**
 * Login User
 * - Authenticates user using email/username and password
 */
router.route("/login").post(loginUser);

/**
 * SECURED ROUTES (JWT REQUIRED)
 * ----------------------------
 */

/**
 * Logout User
 * - Clears refresh token from DB
 * - Clears cookies
 */
router.route("/logout").post(verifyJWT, logoutUser);

/**
 * Refresh Access Token
 * - Generates new access token using refresh token
 */
router.route("/refresh-token").post(refreshAccessToken);

/**
 * Change Current Password
 * - Requires old password verification
 */
router.route("/change-password").post(verifyJWT, changeCurrentPassword);

/**
 * Get Logged-in User Details
 */
router.route("/current-user").get(verifyJWT, getCurrentUser);

/**
 * Update Account Details
 * - Updates full name and email
 */
router.route("/update-account").patch(verifyJWT, updateAccountDetails);

/**
 * FILE UPLOAD ROUTES
 * ------------------
 */

/**
 * Update User Avatar
 * - Accepts single avatar image
 */
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

/**
 * Update User Cover Image
 * - Accepts single cover image
 */
router
  .route("/cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

/**
 * USER CHANNEL ROUTES
 * -------------------
 */

/**
 * Get User Channel Profile
 * - Fetches public channel info using username
 */
router.route("/c/:username").get(verifyJWT, getUserChannelProfile);

/**
 * Get Watch History of Logged-in User
 */
router.route("/history").get(verifyJWT, getWatchHistory);

// Export router to use in main app
export default router;



// import { Router } from "express";
// import {
//   changeCurrentPassword,
//   getCurrentUser,
//   getUserChannelProfile,
//   getWatchHistory,
//   loginUser,
//   logoutUser,
//   refreshAccessToken,
//   registerUser,
//   updateAccountDetails,
//   updateUserAvatar,
//   updateUserCoverImage,
// } from "../controllers/user.controller.js";
// import { upload } from "../middlewares/multer.middleware.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";

// const router = Router();

// router.route("/register").post(
//   upload.fields([
//     {
//       name: "avatar",
//       maxCount: 1,
//     },
//     {
//       name: "coverImage",
//       maxCount: 1,
//     },
//   ]),
//   registerUser
// );

// router.route("/login").post(loginUser);

// //secured routes
// router.route("/logout").post(verifyJWT, logoutUser);
// router.route("/refresh-token").post(refreshAccessToken);
// router.route("/change-password").post(verifyJWT, changeCurrentPassword);
// router.route("/current-user").get(verifyJWT, getCurrentUser);
// router.route("/update-account").patch(verifyJWT, updateAccountDetails);

// //update avatar and cover image ---files
// router
//   .route("/avatar")
//   .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
// router
//   .route("/cover-image")
//   .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

// router.route("/c/:username").get(verifyJWT, getUserChannelProfile);
// router.route("/history").get(verifyJWT, getWatchHistory);

// export default router;
