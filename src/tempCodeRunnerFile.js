// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

// Import database connection function
import connectDB from "./db/index.js";

// Import Express app instance
import { app } from "./app.js";

// Connect to MongoDB
connectDB()
  .then(() => {
    // Start server only after successful DB connection
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server is running at port: ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    // If DB connection fails, log error
    console.log("❌ MongoDB connection failed !!!", err);
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
