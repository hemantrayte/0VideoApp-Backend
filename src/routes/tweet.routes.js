
// Import Router from Express to create modular route handlers
import { Router } from "express";

// Import tweet controller functions
import {
  allTweets,
  createTweet,
  deleteTweet,
  getUserTweets,
  updateTweet,
} from "../controllers/tweet.controller.js";

// JWT authentication middleware to protect tweet routes
import { verifyJWT } from "../middlewares/auth.middleware.js";

// Initialize router instance
const router = Router();

/**
 * Apply JWT verification middleware to all tweet routes
 * - Ensures only authenticated users can create, update, or delete tweets
 */
router.use(verifyJWT);

/**
 * TWEET ROUTES
 * ------------
 */

/**
 * Create a new tweet
 */
router.route("/").post(createTweet);

/**
 * Get all tweets
 * - Can be used for feed or timeline
 */
router.route("/").get(allTweets);

/**
 * Get all tweets created by a specific user
 * - userId is passed as URL parameter
 */
router.route("/user/:userId").get(getUserTweets);

/**
 * Update or delete a tweet
 * - tweetId is passed as URL parameter
 */
router
  .route("/:tweetId")
  .patch(updateTweet)   // Update tweet content
  .delete(deleteTweet); // Delete tweet

// Export router
export default router;


// import { Router } from "express";
// import {
//   allTweets,
//   createTweet,
//   deleteTweet,
//   getUserTweets,
//   updateTweet,
// } from "../controllers/tweet.controller.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";

// const router = Router();
// router.use(verifyJWT);

// router.route("/").post(createTweet);
// router.route("/").get(allTweets);
// router.route("/user/:userId").get(getUserTweets);
// router.route("/:tweetId").patch(updateTweet).delete(deleteTweet);

// export default router;
