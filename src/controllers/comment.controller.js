import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!videoId) {
    throw new ApiError(400, "Video ID is required");
  }

  // aggregate pipeline for comments
  const commentsAggregate = Comment.aggregate([
    { $match: { video: new mongoose.Types.ObjectId(videoId) } },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [{ $project: { fullName: 1, username: 1, avatar: 1 } }],
      },
    },
    { $unwind: "$owner" },
    { $sort: { createdAt: -1 } },
  ]);

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  const commentsResult = await Comment.aggregatePaginate(
    commentsAggregate,
    options
  );

  // include totalComments separately
  const totalComments = commentsResult.totalDocs;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        comments: commentsResult.docs,
        currentPage: commentsResult.page,
        totalPages: commentsResult.totalPages,
        totalComments,
      },
      "Comments fetched successfully"
    )
  );
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  const { content } = req.body;
  const { videoId } = req.params; // videoId from URL
  const userId = req.user?._id; // logged-in user from JWT middleware

  if (!content) {
    throw new ApiError(400, "Comment content is required");
  }

  if (!videoId) {
    throw new ApiError(400, "Video ID is required");
  }

  const comment = await Comment.create({
    content: content,
    video: videoId,
    owner: userId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, comment, "Comment added successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
  const { content } = req.body;
  const userId = req.user?._id;
  const { commentId } = req.params; // commentId from URL

  if (!content) {
    throw new ApiError(400, "Comment content is required");
  }

  if (!commentId) {
    throw new ApiError(400, "Comment ID is required");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  // check if the logged-in user is the owner of the comment
  if (comment.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to edit this comment");
  }

  comment.content = content;
  await comment.save();

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
  const userId = req.user?._id;
  const { commentId } = req.params;

  if (!commentId) {
    throw new ApiError(400, "Comment ID is required");
  }

  // find the comment
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  // check if the logged-in user is the owner of the comment
  if (comment.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to delete this comment");
  }

  await comment.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Comment deleted successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };

// const getVideoComments = asyncHandler(async (req, res) => {
//   const { videoId } = req.params;
//   const { page = 1, limit = 10 } = req.query;

//   if (!videoId) {
//     throw new ApiError(400, "Video ID is required");
//   }

//   // aggregate pipeline for comments
//   const commentsAggregate = Comment.aggregate([
//     {
//       $match: { video: new mongoose.Types.ObjectId(videoId) }
//     },
//     {
//       $lookup: {
//         from: "users", // collection name in MongoDB
//         localField: "owner",
//         foreignField: "_id",
//         as: "owner",
//         pipeline: [
//           { $project: { fullName: 1, username: 1, avatar: 1 } }
//         ]
//       }
//     },
//     {
//       $unwind: "$owner"
//     },
//     {
//       $sort: { createdAt: -1 } // newest first
//     }
//   ]);

//   const options = {
//     page: parseInt(page, 10),
//     limit: parseInt(limit, 10)
//   };

//   const comments = await Comment.aggregatePaginate(commentsAggregate, options);

//   return res.status(200).json(
//     new ApiResponse(200, comments, "Comments fetched successfully")
//   );
// });
