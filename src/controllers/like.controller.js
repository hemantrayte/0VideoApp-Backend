import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user?._id;

  if (!videoId) {
    throw new ApiError(404, "Video not found");
  }

  // Check if user already liked this video
  const existingLike = await Like.findOne({ video: videoId, likedBy: userId });

  if (existingLike) {
    // User has already liked → remove the like
    await existingLike.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Like removed",
    });
  } else {
    // User has not liked → create a new like
    const newLike = await Like.create({
      video: videoId,
      likedBy: userId,
    });
    return res.status(201).json({
      success: true,
      message: "Video liked",
      like: newLike,
    });
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user?._id;
  //TODO: toggle like on comment

  if (!commentId) {
    throw new ApiError(404, "comment not found");
  }

  //cheak if user already likes this comment
  const existingLike = await Like.findOne({
    comment: commentId,
    likedBy: userId,
  });

  
  if (existingLike) {
    // User has already liked → remove the like
    await existingLike.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Comment removed Like",
    });
  } else {
    // User has not liked → create a new like
    const newLike = await Like.create({
      comment: commentId,
      likedBy: userId,
    });
    return res.status(201).json({
      success: true,
      message: "Comment liked",
      like: newLike,
    });
  }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const userId = req.user?._id;
  //TODO: toggle like on tweet

  if (!tweetId) {
    throw new ApiError(404, "tweet not found");
  }

  const existingLike = await Like.findOne({ tweet: tweetId, likedBy: userId });

  if (existingLike) {
    await existingLike.deleteOne();
    return res.status(200).json(new ApiResponse(200, "Tweet Like removed"));
  } else {
    const newLike = await Like.create({
      tweet: tweetId,
      likedBy: userId,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, { like: newLike }, "Tweet Liked"));
  }
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized, user not found");
  }

  // Find all likes for videos by this user
  const likedVideos = await Like.find({
    likedBy: userId,
    video: { $ne: null }, // only video likes
  })
    .populate({
      path: "video",
      select: "title description thumbnail views createdAt", // pick only useful fields
      populate: {
        path: "owner",
        select: "fullName username avatar", // get video owner details
      },
    })
    .sort({ createdAt: -1 }); // newest likes first

  return res
    .status(200)
    .json(
      new ApiResponse(200, likedVideos, "Liked videos fetched successfully")
    );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
