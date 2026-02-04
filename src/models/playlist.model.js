
// Import mongoose and Schema constructor
import mongoose, { Schema } from "mongoose";

/**
 * Playlist Schema
 * ---------------
 * Represents a collection of videos created by a user
 */
const playlistSchema = new Schema(
  {
    /**
     * Name of the playlist
     */
    name: {
      type: String,
      required: true,
    },

    /**
     * Description of the playlist
     */
    description: {
      type: String,
      required: true,
    },

    /**
     * List of videos included in the playlist
     * Stores references to Video documents
     */
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],

    /**
     * Reference to the user who owns the playlist
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

// Export Playlist model
export const Playlist = mongoose.model("Playlist", playlistSchema);



// import mongoose, { Schema } from "mongoose";

// const playlistSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },

//     videos: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Video",
//       },
//     ],
//     owner: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// export const Playlist = mongoose.model("Playlist", playlistSchema);
