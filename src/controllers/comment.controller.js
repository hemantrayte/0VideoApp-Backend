import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const { content } = req.body;
  const { videoId } = req.params;   // videoId from URL
  const userId = req.user?._id;     // logged-in user from JWT middleware

  if (!content) {
    throw new ApiError(400, "Comment content is required");
  }

  if (!videoId) {
    throw new ApiError(400, "Video ID is required");
  }

    const comment = await Comment.create({
      content:content,
      video:videoId,
      owner:userId
    })

    return res.status(201).json(
      new ApiResponse(201, comment, "Comment added successfully")
    )
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const { content } = req.body;
    const userId = req.user?._id;
    const { commentId } = req.params;   // commentId from URL

    if (!content) {
      throw new ApiError(400, "Comment content is required");
    }
  
    if (!commentId) {
      throw new ApiError(400, "Comment ID is required");
    }

    const comment = await Comment.findById(commentId)

    if(!comment) {
      throw new ApiError(404, "Comment not found");
    }

     // check if the logged-in user is the owner of the comment
  if (comment.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to edit this comment");
  }

  comment.content = content;
  await comment.save();

  return res.status(200).json(
    new ApiResponse(200, comment, "Comment updated successfully")
  );
    
})

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


export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }