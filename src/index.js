// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

// Import MongoDB connection function
import connectDB from "./db/index.js";

// Import configured Express app
import { app } from "./app.js";

/**
 * Connect to MongoDB and start the server
 */
connectDB()
  .then(() => {
    // Start Express server after successful DB connection
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server is running on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    // Log error if MongoDB connection fails
    console.log("❌ MongoDB connection failed!", err);
  });



// import dotenv from "dotenv";
// dotenv.config();
// import connectDB from "./db/index.js";
// import { app } from "./app.js";

// connectDB()
//   .then(() => {
//     app.listen(process.env.PORT || 5000, () => {
//       console.log(`Server is running at port: ${process.env.PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log("MONGO DB connection failed !!!", err);
//   });
