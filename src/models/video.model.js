// Import required modules
import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

/**
 * Video Schema
 * ------------
 * Represents uploaded videos in the platform
 */
const videoSchema = new Schema(
  {
    /**
     * Video file URL (stored on Cloudinary or any storage service)
     */
    videoFile: {
      type: String,
      required: true,
    },

    /**
     * Thumbnail image URL for the video
     */
    thumbnail: {
      type: String,
      required: true,
    },

    /**
     * Title of the video
     */
    title: {
      type: String,
      required: true,
    },

    /**
     * Video description
     */
    description: {
      type: String,
      required: true,
    },

    /**
     * Video duration in seconds
     */
    duration: {
      type: Number,
      required: true,
    },

    /**
     * Total number of views
     */
    views: {
      type: Number,
      default: 0,
    },

    /**
     * Publish status of the video
     * true  -> public
     * false -> private/unpublished
     */
    isPublished: {
      type: Boolean,
      default: true,
    },

    /**
     * Reference to the user who uploaded the video
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
 * Plugin for aggregation pagination
 * Used for paginated video listing (home feed, search, channel videos)
 */
videoSchema.plugin(mongooseAggregatePaginate);

// Export Video model
export const Video = mongoose.model("Video", videoSchema);


// import mongoose, { Schema } from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// const videoSchema = new Schema(
//   {
//     videoFile: {
//       type: String,
//       required: true,
//     },
//     thumbnail: {
//       type: String,
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     duration: {
//       type: Number,
//       required: true,
//     },
//     views: {
//       type: Number,
//       default: 0,
//     },
//     isPublished: {
//       type: Boolean,
//       default: true,
//     },
//     owner: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// videoSchema.plugin(mongooseAggregatePaginate);

// export const Video = mongoose.model("Video", videoSchema);
