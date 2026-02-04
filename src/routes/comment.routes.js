// Import Router from Express to create modular route handlers
import { Router } from "express";

// Import comment controller functions
import {
  addComment,
  deleteComment,
  getVideoComments,
  updateComment,
} from "../controllers/comment.controller.js";

// JWT middleware to protect comment routes
import { verifyJWT } from "../middlewares/auth.middleware.js";

// Initialize router
const router = Router();

/**
 * Apply JWT verification middleware to all routes below
 * - Ensures only authenticated users can access comment APIs
 */
router.use(verifyJWT);

/**
 * COMMENT ROUTES
 * --------------
 */

/**
 * Get all comments for a video
 * Add a new comment to a video
 * - videoId is passed as URL parameter
 */
router.route("/:videoId")
  .get(getVideoComments)   // Fetch comments of a specific video
  .post(addComment);       // Add new comment to a video

/**
 * Update or delete a comment
 * - commentId is passed as URL parameter
 */
router.route("/c/:commentId")
  .delete(deleteComment)   // Delete a specific comment
  .patch(updateComment);   // Update a specific comment

// Export router
export default router;


// import { Router } from "express";
// import {
//   addComment,
//   deleteComment,
//   getVideoComments,
//   updateComment,
// } from "../controllers/comment.controller.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";

// const router = Router();

// router.use(verifyJWT);

// router.route("/:videoId").get(getVideoComments).post(addComment);
// router.route("/c/:commentId").delete(deleteComment).patch(updateComment);

// export default router;
