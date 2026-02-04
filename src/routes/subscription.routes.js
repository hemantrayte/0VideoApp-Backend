
// Import Router from Express to create modular route handlers
import { Router } from "express";

// Import subscription controller functions
import {
  getSubscribedChannels,
  getUserChannelSubscribers,
  toggleSubscription,
} from "../controllers/subscription.controller.js";

// JWT authentication middleware to protect subscription routes
import { verifyJWT } from "../middlewares/auth.middleware.js";

// Initialize router instance
const router = Router();

/**
 * Apply JWT verification middleware to all subscription routes
 * - Ensures only authenticated users can subscribe/unsubscribe
 */
router.use(verifyJWT);

/**
 * SUBSCRIPTION ROUTES
 * -------------------
 */

/**
 * Get all subscribers of a specific channel
 * - channelId is passed as URL parameter
 */
router.get("/c/:channelId", getUserChannelSubscribers);

/**
 * Toggle subscription to a channel
 * - If already subscribed → unsubscribe
 * - If not subscribed → subscribe
 */
router.post("/c/:channelId", toggleSubscription);

/**
 * Get all channels subscribed by a user
 * - subscriberId is passed as URL parameter
 */
router.route("/u/:subscriberId").get(getSubscribedChannels);

// Export router
export default router;



// import { Router } from "express";
// import {
//   getSubscribedChannels,
//   getUserChannelSubscribers,
//   toggleSubscription,
// } from "../controllers/subscription.controller.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";

// const router = Router();
// router.use(verifyJWT);

// // router
// // .route("/c/:channelId")
// // .get(getSubscribedChannels)
// // .post(toggleSubscription);

// router.get("/c/:channelId", getUserChannelSubscribers);
// router.post("/c/:channelId", toggleSubscription);

// router.route("/u/:subscriberId").get(getSubscribedChannels);

// export default router;
