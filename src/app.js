
// Import core dependencies
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import global error handling middleware
import { errorHandler } from "./middlewares/error.middleware.js";

// Initialize Express app
const app = express();

/**
 * --------------------
 * Global Middlewares
 * --------------------
 */

// Enable CORS for cross-origin requests
app.use(cors());

// More secure & configurable CORS setup (recommended for production)
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// Parse cookies from incoming requests
app.use(cookieParser());

// Parse incoming JSON payloads (limit size to prevent abuse)
app.use(express.json({ limit: "16kb" }));

// Parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files (images, videos, assets)
app.use(express.static("public"));

/**
 * --------------------
 * Routes Import
 * --------------------
 */
import userRouter from "./routes/user.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import videoRouter from "./routes/video.routes.js";
import commentRouter from "./routes/comment.routes.js";
import likeRouter from "./routes/like.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";

/**
 * --------------------
 * Routes Declaration
 * --------------------
 */

// User authentication & profile routes
app.use("/api/v1/users", userRouter);

// Health check endpoint (used for monitoring)
app.use("/api/v1/healthcheck", healthcheckRouter);

// Tweet-related routes
app.use("/api/v1/tweets", tweetRouter);

// Channel subscription routes
app.use("/api/v1/subscriptions", subscriptionRouter);

// Video upload & management routes
app.use("/api/v1/videos", videoRouter);

// Video comment routes
app.use("/api/v1/comments", commentRouter);

// Like / Unlike routes
app.use("/api/v1/likes", likeRouter);

// Playlist management routes
app.use("/api/v1/playlist", playlistRouter);

// Dashboard analytics routes
app.use("/api/v1/dashboard", dashboardRouter);

/**
 * --------------------
 * Global Error Handler
 * --------------------
 * Must be the last middleware
 */
app.use(errorHandler);

// Export app instance
export { app };


// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import { errorHandler } from "./middlewares/error.middleware.js";

// const app = express();

// app.use(cors());

// // app.use(cors({
// //   origin: process.env.CORS_ORIGIN,
// //   methods: ["GET", "POST", "PUT", "DELETE"],
// //   credentials: true
// // }))
// app.use(cookieParser());

// app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(express.static("public"));

// // ✅ Error handling middleware

// //routes import
// //routes import
// import userRouter from "./routes/user.routes.js";
// import healthcheckRouter from "./routes/healthcheck.routes.js";
// import tweetRouter from "./routes/tweet.routes.js";
// import subscriptionRouter from "./routes/subscription.routes.js";
// import videoRouter from "./routes/video.routes.js";
// import commentRouter from "./routes/comment.routes.js";
// import likeRouter from "./routes/like.routes.js";
// import playlistRouter from "./routes/playlist.routes.js";
// import dashboardRouter from "./routes/dashboard.routes.js";

// //routes declaration
// app.use("/api/v1/users", userRouter); //done
// app.use("/api/v1/healthcheck", healthcheckRouter); //done
// app.use("/api/v1/tweets", tweetRouter); //done
// app.use("/api/v1/subscriptions", subscriptionRouter); //done
// app.use("/api/v1/videos", videoRouter); //done
// app.use("/api/v1/comments", commentRouter); //done
// app.use("/api/v1/likes", likeRouter); //done
// app.use("/api/v1/playlist", playlistRouter); //done
// app.use("/api/v1/dashboard", dashboardRouter);

// app.use(errorHandler);

// export { app };
