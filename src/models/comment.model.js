// Import mongoose and Schema constructor
import mongoose, { Schema } from "mongoose";

// Plugin for pagination support in aggregation pipelines
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

/**
 * Comment Schema
 * --------------
 * Represents a comment made by a user on a video
 */
const commentSchema = new Schema(
  {
    /**
     * Comment text/content
     */
    content: {
      type: String,
      required: true,
    },

    /**
     * Reference to the video on which the comment is made
     */
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },

    /**
     * Reference to the user who posted the comment
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

/**
 * Add pagination capability to aggregation queries
 * Useful for fetching comments in pages
 */
commentSchema.plugin(mongooseAggregatePaginate);

// Export Comment model
export const Comment = mongoose.model("Comment", commentSchema);



// import mongoose, { Schema } from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// const commentSchema = new Schema(
//   {
//     content: {
//       type: String,
//       required: true,
//     },
//     video: {
//       type: Schema.Types.ObjectId,
//       ref: "Video",
//     },
//     owner: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// commentSchema.plugin(mongooseAggregatePaginate);

// export const Comment = mongoose.model("Comment", commentSchema);
