// Import mongoose and Schema constructor
import mongoose, { Schema } from "mongoose";

/**
 * Subscription Schema
 * -------------------
 * Represents a subscription relationship between two users
 * - subscriber → user who subscribes
 * - channel → user who is being subscribed to
 */
const subscriptionSchema = new Schema(
  {
    /**
     * User who is subscribing to a channel
     */
    subscriber: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    /**
     * User (channel) who is being subscribed to
     */
    channel: {
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

// Export Subscription model
export const Subscription = mongoose.model("Subscription", subscriptionSchema);

// import mongoose, { Schema } from "mongoose";

// const subscriptionSchema = new Schema(
//   {
//     subscriber: {
//       type: Schema.Types.ObjectId, // one who is subscribing
//       ref: "User",
//     },

//     channel: {
//       type: Schema.Types.ObjectId, // one to whom 'subscriber' is subscribing
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// export const Subscription = mongoose.model("Subscription", subscriptionSchema);
