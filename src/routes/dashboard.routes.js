
// Import Router from Express to create route handlers
import { Router } from "express";

// Import dashboard controller functions
import {
  getChannelStats,
  getChannelVideos,
} from "../controllers/dashboard.controller.js";

// JWT authentication middleware
import { verifyJWT } from "../middlewares/auth.middleware.js";

// Initialize router instance
const router = Router();

/**
 * Apply JWT verification middleware to all dashboard routes
 * - Ensures only authenticated users can access dashboard data
 */
router.use(verifyJWT);

/**
 * DASHBOARD ROUTES
 * ----------------
 */

/**
 * Get Channel Statistics
 * - Returns analytics like total views, subscribers, etc.
 * - Channel ID is passed as URL parameter
 */
router.route("/stats/:id").get(getChannelStats);

/**
 * Get Channel Videos
 * - Returns all videos uploaded by a channel
 * - Channel ID is passed as URL parameter
 */
router.route("/videos/:id").get(getChannelVideos);

// Export router to be used in main app
export default router;



// import { Router } from "express";
// import {
//   getChannelStats,
//   getChannelVideos,
// } from "../controllers/dashboard.controller.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";

// const router = Router();

// router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

// router.route("/stats/:id").get(getChannelStats);
// router.route("/videos/:id").get(getChannelVideos);

// export default router;
