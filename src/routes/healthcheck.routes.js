
// Import Router from Express to create route handlers
import { Router } from "express";

// Import healthcheck controller
import { healthcheck } from "../controllers/healthcheck.controller.js";

// Initialize router instance
const router = Router();

/**
 * HEALTH CHECK ROUTE
 * ------------------
 * - Used to verify if the server is running
 * - Commonly used by load balancers, monitoring tools, or DevOps checks
 */
router.route("/").get(healthcheck);

// Export router
export default router;


// import { Router } from "express";
// import { healthcheck } from "../controllers/healthcheck.controller.js";

// const router = Router();

// router.route("/").get(healthcheck);

// export default router;
