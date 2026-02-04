// Import Router from Express to create modular route handlers
import { Router } from "express";

// Import video controller functions
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  publishAVideo,
  togglePublishStatus,
  updateVideo,
} from "../controllers/video.controller.js";

// JWT authentication middleware to protect video routes
import { verifyJWT } from "../middlewares/auth.middleware.js";

// Multer middleware for handling video & thumbnail uploads
import { upload } from "../middlewares/multer.middleware.js";

// Initialize router instance
const router = Router();

/**
 * Apply JWT verification middleware to all video routes
 * - Ensures only authenticated users can manage videos
 */
router.use(verifyJWT);

/**
 * VIDEO ROUTES
 * ------------
 */

/**
 * Get all videos
 * Publish a new video
 * - Accepts multipart/form-data
 * - Uploads video file and thumbnail
 */
router
  .route("/")
  .get(getAllVideos)
  .post(
    upload.fields([
      {
        name: "videoFile",
        maxCount: 1,
      },
      {
        name: "thumbnail",
        maxCount: 1,
      },
    ]),
    publishAVideo
  );

/**
 * Get, update, or delete a video by ID
 */
router
  .route("/:videoId")
  .get(getVideoById)        // Fetch video details
  .delete(deleteVideo)     // Delete a video
  .patch(
    upload.single("thumbnail"), // Update video thumbnail
    updateVideo
  );

/**
 * Toggle publish status of a video
 * - Publish or unpublish video
 */
router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

// Export router
export default router;


// import { Router } from "express";
// import {
//   deleteVideo,
//   getAllVideos,
//   getVideoById,
//   publishAVideo,
//   togglePublishStatus,
//   updateVideo,
// } from "../controllers/video.controller.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";
// import { upload } from "../middlewares/multer.middleware.js";

// const router = Router();
// router.use(verifyJWT);

// router
//   .route("/")
//   .get(getAllVideos)
//   .post(
//     upload.fields([
//       {
//         name: "videoFile",
//         maxCount: 1,
//       },
//       {
//         name: "thumbnail",
//         maxCount: 1,
//       },
//     ]),
//     publishAVideo
//   );

// router
//   .route("/:videoId")
//   .get(getVideoById)
//   .delete(deleteVideo)
//   .patch(upload.single("thumbnail"), updateVideo);

// router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

// export default router;
