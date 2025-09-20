import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    const {content} = req.body;
    const userId = req.user?._id;

    if(!content) {
      throw new ApiError(400, "Tweet content is required");
    }

    // Check if user exists before creating a tweet
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

    const tweet = await Tweet.create({
      content,
      owner:userId
    })

    return res.status(201).json(
      new ApiResponse(201, tweet, "Tweet created successfully")
    );
})

const allTweets = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(404, "User ID is required");
  }

  // Fetch all tweets and populate the 'user' field with selected info
  const tweets = await Tweet.find({})
    .populate("owner", "username fullName avatar") // replace 'user' with your actual field name in Tweet schema
    .sort({ createdAt: -1 }); // optional: latest tweets first

  return res.status(200).json(
    new ApiResponse(200, tweets, "Tweets fetched successfully")
  );
});


const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    const userId = req.user?._id;

    if(!userId) {
      throw new ApiError(400,"Invalid user id")
    }

    const tweets = await Tweet.find({ owner: userId }) .populate("owner", "username fullName avatar") // replace 'user' with your actual field name in Tweet schema
    .sort({ createdAt: -1 }); // optional: latest tweets first

  return res
  .status(200)
  .json(new ApiResponse(
      200,
      tweets,
      "Tweet fetched successfully"
  ))

})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
    const {content} = req.body;
    const userId = req.user?._id;
    const { tweetId} = req.params;
    
    if(!content) {
      throw new ApiError(400,"content is required")
    }

    if (!tweetId) {
      throw new ApiError(400, "Tweet ID is required");
    }


    const tweet = await Tweet.findOneAndUpdate(
      { _id: tweetId, owner: userId },
      { $set: {content}  },
      { new: true } // return updated tweet
    );
  
    if(!tweet) {
      throw new ApiError(404, "Comment not found");
    }


    return res
      .status(200)
      .json(new ApiResponse(200, tweet, "Tweet updated successfully"));
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
    const userId = req.user?._id;
    const { tweetId} = req.params;

    // const tweet = await Tweet.findOne(tweetId)

    const tweet = await Tweet.findOneAndDelete({
      _id:tweetId,
      owner:userId
    })
    
    if (!tweet) {
      throw new ApiError(404, "Tweet not found");
    }

    // if(tweetId.owner.toString() !== userId.toString()) {
    //   throw new ApiError(403, "You are not allowed to delete this tweet");
    // }

    await tweet.deleteOne();

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Tweet deleted successfully"));

})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet,
    allTweets
}