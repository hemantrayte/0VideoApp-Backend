// Import mongoose to interact with MongoDB
import mongoose from "mongoose";

// Import database name constant
import { DB_NAME } from "../constants.js";

/**
 * connectDB
 * -----------
 * This function establishes a connection to the MongoDB database
 * using mongoose.
 */
const connectDB = async () => {
  try {
    /**
     * mongoose.connect() returns a connection instance
     * process.env.MONGODB_URI -> base MongoDB URL from environment variables
     * DB_NAME -> database name appended to the URI
     */
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    // Log successful connection with the database host
    console.log(
      `✅ MongoDB connected! Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    /**
     * If any error occurs while connecting to MongoDB,
     * log the error message and stop the Node.js process
     */
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Exit process with failure code
  }
};

// Export the function so it can be used in other files
export default connectDB;
