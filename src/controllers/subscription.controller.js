import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { channel, subscribe } from "diagnostics_channel"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    const userId = req.user?._id;
    // TODO: toggle subscription

    if (!userId) {
      throw new ApiError(401, "Unauthorized, user not found");
  }

  if (!channelId) {
    throw new ApiError(400, "Channel ID is required");
  }


  
  const existingSubscription = await Subscription.findOne({subscriber:userId, channel:channelId})

  if (existingSubscription) {
    await existingSubscription.deleteOne();
    return res.status(200).json(
      new ApiResponse(
        200,
        { subscribed: false },
        "Unsubscribed from channel"
      )
    );
  } else {
    const subscribedChannel = await Subscription.create({
      subscriber: userId,
      channel: channelId
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        { subscribed: true, subscription: subscribedChannel },
        "Channel subscribed successfully"
      )
    );
  }

})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params

    if (!channelId) {
      throw new ApiError(400, "Channel ID is required");
    }

    const subscribers = await Subscription.find({ channel: channelId })
    .populate("subscriber", "fullName username avatar") // show subscriber details
    .sort({ createdAt: -1 }); // newest subscribers first

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalSubscribers: subscribers.length,
        subscribers,
      },
      "Channel subscribers fetched successfully"
    )
  );

})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { id:subscriberId } = req.params;

  if (!subscriberId) {
    throw new ApiError(400, "Subscriber ID is required");
  }

  // find all subscriptions where the given user is the subscriber
  const channelList = await Subscription.find({ subscriber: subscriberId })
    .populate("channel", "fullName username avatar") // populate channel info
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalChannels: channelList.length,
        channels: channelList.map(sub => sub.channel), // just channel details
      },
      "Subscribed channels fetched successfully"
    )
  );
});


export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}