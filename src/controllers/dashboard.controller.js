import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  const { id: channelId } = req.params;
  console.log(req.params);

  if (!channelId) {
    throw new ApiError(400, "Channel ID is required");
  }

  // 1. Total videos & total views
  const videoStats = await Video.aggregate([
    { $match: { owner: new mongoose.Types.ObjectId(channelId) } },
    {
      $group: {
        _id: null,
        totalVideos: { $sum: 1 },
        totalViews: { $sum: "$views" },
      },
    },
  ]);

  const totalVideos = videoStats[0]?.totalVideos || 0;
  const totalViews = videoStats[0]?.totalViews || 0;

  // 2. Total subscribers
  const totalSubscribers = await Subscription.countDocuments({
    channel: channelId,
  });

  // 3. Total likes on channel’s videos
  const videoIds = await Video.find({ owner: channelId }).distinct("_id");
  const totalLikes = await Like.countDocuments({ video: { $in: videoIds } });
  
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalVideos,
        totalViews,
        totalSubscribers,
        totalLikes,
      },
      "Channel stats fetched successfully"
    )
  );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  const { id: channelId } = req.params;

  if (!channelId) {
    throw new ApiError(400, "Channel ID is required");
  }

  // Find all videos uploaded by this channel
  const videos = await Video.find({ owner: channelId })
    .populate("owner", "fullName username avatar") // include channel details
    .sort({ createdAt: -1 }); // newest videos first

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalVideos: videos.length,
        videos,
      },
      "Channel videos fetched successfully"
    )
  );
});

export { getChannelStats, getChannelVideos };
