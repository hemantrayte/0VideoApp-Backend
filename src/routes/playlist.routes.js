// Import Router from Express to create modular route handlers
import { Router } from "express";

// Import playlist controller functions
import {
  addVideoToPlaylist,
  allPlaylist,
  createPlaylist,
  deletePlaylist,
  getPlaylistById,
  getUserPlaylists,
  removeVideoFromPlaylist,
  updatePlaylist,
} from "../controllers/playlist.controller.js";

// JWT authentication middleware to protect playlist routes
import { verifyJWT } from "../middlewares/auth.middleware.js";

// Initialize router instance
const router = Router();

/**
 * Apply JWT verification middleware to all playlist routes
 * - Ensures only authenticated users can manage playlists
 */
router.use(verifyJWT);

/**
 * PLAYLIST ROUTES
 * ---------------
 */

/**
 * Create a new playlist
 */
router.route("/").post(createPlaylist);

/**
 * Get, update, or delete a playlist by ID
 */
router
  .route("/:playlistId")
  .get(getPlaylistById)     // Fetch playlist details
  .patch(updatePlaylist)   // Update playlist information
  .delete(deletePlaylist); // Delete a playlist

/**
 * Add a video to a playlist
 * - videoId and playlistId passed as URL parameters
 */
router.route("/add/:videoId/:playlistId").patch(addVideoToPlaylist);

/**
 * Remove a video from a playlist
 * - videoId and playlistId passed as URL parameters
 */
router.route("/remove/:videoId/:playlistId").patch(removeVideoFromPlaylist);

/**
 * Get all playlists (e.g., for discovery or admin view)
 */
router.route("/").get(allPlaylist);

/**
 * Get all playlists created by a specific user
 */
router.route("/user/:userId").get(getUserPlaylists);

// Export router
export default router;


// import { Router } from "express";
// import {
//   addVideoToPlaylist,
//   allPlaylist,
//   createPlaylist,
//   deletePlaylist,
//   getPlaylistById,
//   getUserPlaylists,
//   removeVideoFromPlaylist,
//   updatePlaylist,
// } from "../controllers/playlist.controller.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";

// const router = Router();

// router.use(verifyJWT);

// router.route("/").post(createPlaylist);

// router
//   .route("/:playlistId")
//   .get(getPlaylistById)
//   .patch(updatePlaylist)
//   .delete(deletePlaylist);

// router.route("/add/:videoId/:playlistId").patch(addVideoToPlaylist);
// router.route("/remove/:videoId/:playlistId").patch(removeVideoFromPlaylist);
// router.route("/").get(allPlaylist);

// router.route("/user/:userId").get(getUserPlaylists);

// export default router;
