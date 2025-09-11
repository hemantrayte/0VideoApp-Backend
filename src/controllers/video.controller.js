import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10, query = "", sortBy = "createdAt", sortType = "desc", userId } = req.query;

  // 1) Validate and convert pagination parameters
  page = Math.max(1, parseInt(page));
  limit = Math.max(1, parseInt(limit));
  const skip = (page - 1) * limit;

  // 2) Build filter
  const filter = { isPublished: true }; // only published videos

  if (query) {
    filter.$or = [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } }
    ];
  }

  if (!userId) {
    throw new ApiError(404, "user ID is required") // filter by specific user
  }

  // 3) Validate sort field
  const allowedSortFields = ["createdAt", "title", "views"];
  const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";

  // 4) Sorting options
  const sortOptions = { [sortField]: sortType === "asc" ? 1 : -1 };

  // 5) Fetch videos
  const videos = await Video.find(filter)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit)
    .populate("owner", "username fullName avatar")
    .lean();

  // 6) Count total videos
  const totalVideos = await Video.countDocuments(filter);

  // 7) Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        videos,
        currentPage: page,
        totalPages: Math.ceil(totalVideos / limit),
        totalVideos,
      },
      "Videos fetched successfully"
    )
  );
});


const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user._id

  // 1) Validate required fields
  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  // 2) Ensure files are uploaded (from multer)
  if (!req.files || !req.files.videoFile || !req.files.thumbnail) {
    return res.status(400).json({ message: "Video file and thumbnail are required" });
  }

  const videoFilePath = req.files.videoFile[0].path;
  const thumbnailPath = req.files.thumbnail[0].path;

  // 3) Upload to Cloudinary
  const videoUpload = await uploadOnCloudinary(videoFilePath);
  const thumbnailUpload = await uploadOnCloudinary(thumbnailPath);

  if (!videoUpload || !thumbnailUpload) {
    return res.status(500).json({ message: "Error uploading files to Cloudinary" });
  }

  // 4) Create video entry in MongoDB
  const newVideo = await Video.create({
    title,
    description,
    videoFile: videoUpload.secure_url,
    thumbnail: thumbnailUpload.secure_url,
    duration: Math.floor(videoUpload.duration), // Cloudinary gives duration in seconds
    owner: userId, // from auth middleware
  });

  // 5) Respond to client
  return res.status(201).json({
    success: true,
    message: "Video published successfully",
    video: newVideo,
  });
});



const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}