// Import mongoose and Schema constructor
import mongoose, { Schema } from "mongoose";

/**
 * Like Schema
 * -----------
 * Represents a "like" action performed by a user
 * A like can belong to:
 * - a video
 * - a comment
 * - a tweet
 */
const likeSchema = new Schema(
  {
    /**
     * Reference to the liked video (if applicable)
     */
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },

    /**
     * Reference to the liked comment (if applicable)
     */
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },

    /**
     * Reference to the liked tweet (if applicable)
     */
    tweet: {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },

    /**
     * Reference to the user who liked the content
     */
    likedBy: {
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

// Export Like model
export const Like = mongoose.model("Like", likeSchema);



// import mongoose, { Schema } from "mongoose";

// const likeSchema = new Schema(
//   {
//     video: {
//       type: Schema.Types.ObjectId,
//       ref: "Video",
//     },
//     comment: {
//       type: Schema.Types.ObjectId,
//       ref: "Comment",
//     },
//     tweet: {
//       type: Schema.Types.ObjectId,
//       ref: "Tweet",
//     },
//     likedBy: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// export const Like = mongoose.model("Like", likeSchema);
