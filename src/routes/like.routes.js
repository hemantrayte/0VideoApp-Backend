// Import Router from Express to create modular route handlers
import { Router } from "express";

// Import like controller functions
import {
  getLikedVideos,
  toggleCommentLike,
  toggleVideoLike,
  toggleTweetLike,
} from "../controllers/like.controller.js";

// JWT authentication middleware to protect like routes
import { verifyJWT } from "../middlewares/auth.middleware.js";

// Initialize router instance
const router = Router();

/**
 * Apply JWT verification middleware to all like routes
 * - Ensures only authenticated users can like/unlike content
 */
router.use(verifyJWT);

/**
 * LIKE ROUTES
 * -----------
 */

/**
 * Toggle like on a video
 * - If already liked → unlike
 * - If not liked → like
 */
router.route("/toggle/v/:videoId").post(toggleVideoLike);

/**
 * Toggle like on a comment
 */
router.route("/toggle/c/:commentId").post(toggleCommentLike);

/**
 * Toggle like on a tweet
 */
router.route("/toggle/t/:tweetId").post(toggleTweetLike);

/**
 * Get all videos liked by the logged-in user
 */
router.route("/videos").get(getLikedVideos);

// Export router
export default router;




// import { Router } from "express";
// import {
//   getLikedVideos,
//   toggleCommentLike,
//   toggleVideoLike,
//   toggleTweetLike,
// } from "../controllers/like.controller.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";

// const router = Router();
// router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

// router.route("/toggle/v/:videoId").post(toggleVideoLike);
// router.route("/toggle/c/:commentId").post(toggleCommentLike);
// router.route("/toggle/t/:tweetId").post(toggleTweetLike);
// router.route("/videos").get(getLikedVideos);

// export default router;
