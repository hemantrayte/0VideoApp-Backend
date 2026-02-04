// Import mongoose and Schema constructor
import mongoose, { Schema } from "mongoose";

/**
 * Tweet Schema
 * ------------
 * Represents a short text post created by a user
 */
const tweetSchema = new Schema(
  {
    /**
     * Content of the tweet
     */
    content: {
      type: String,
      required: true,
    },

    /**
     * Reference to the user who created the tweet
     */
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    /**
     * Automatically adds:
     * - createdAt
     * - updatedAt
     */
    timestamps: true,
  }
);

// Export Tweet model
export const Tweet = mongoose.model("Tweet", tweetSchema);


// import mongoose, { Schema } from "mongoose";

// const tweetSchema = new Schema(
//   {
//     content: {
//       type: String,
//       required: true,
//     },
//     owner: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// export const Tweet = mongoose.model("Tweet", tweetSchema);
