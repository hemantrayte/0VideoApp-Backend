import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloundinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10, query = "", sortBy = "createdAt", sortType = "desc" } = req.query;

  const userId = req.user._id


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


const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params
  const userId = req.user._id
  //TODO: get video by id

  // 1) Validate videoId
if (!videoId) {
  throw new ApiError(400, "Video Id is required");
}

if (!mongoose.isValidObjectId(videoId)) {
  throw new ApiError(400, "Invalid Video Id format");
}

// 2) Optional: Ensure user is logged in
if (!userId) {
  throw new ApiError(401, "User ID is required");
}

 // 3) Find video
const singleVideo = await Video.findById(videoId).populate(
  "owner",
  "username fullName avatar"
);

if (!singleVideo) {
  throw new ApiError(404, "Video not found");
}

//returen responce
 return res
 .status(200)
 .json(
  new ApiResponse(
    200,
    singleVideo,
    "video fetched successfully"
  )
 )
})


const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const {title, description} = req.body
    const userId = req.user._id
    //TODO: update video details like title, description, thumbnail

    // 1) Validate input
  if (!videoId) {
    throw new ApiError(400, "Video ID is required");
  }
  if (!mongoose.isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid Video ID format");
  }
  if (!userId) {
    throw new ApiError(401, "User ID is required");
  }

   // 2) Prepare update data
   const updateData = {};
   if (title) updateData.title = title;
   if (description) updateData.description = description;

   // ✅ Optional: update thumbnail if uploaded
  if (req.file) {
    const thumbnailUpload = await uploadOnCloudinary(req.file.path);
    if (thumbnailUpload) {
      updateData.thumbnail = thumbnailUpload.secure_url;
    }
  }

    // 3) Update video (only if owned by user)
  const updatedVideo = await Video.findOneAndUpdate(
    { _id: videoId, owner: userId }, // condition: must be owned by current user
    { $set: updateData },
    { new: true }
  );

  if (!updatedVideo) {
    throw new ApiError(404, "Video not found or you are not authorized to update it");
  }

  // 4) Return response
  return res.status(200).json(
    new ApiResponse(
      200,
      updatedVideo,
      "Video updated successfully"
    )
  );

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const userId = req.user?._id
    //TODO: delete video

      // 1) Validate input
  if (!videoId) {
    throw new ApiError(400, "Video ID is required");
  }

  if (!mongoose.isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid Video ID format");
  }


  // 2) Delete video (only if owned by user)
  const deletedVideo = await Video.findOneAndDelete({
    _id: videoId,
    owner: userId,
  });

  if (!deletedVideo) {
    throw new ApiError(
      404,
      "Video not found or you are not allowed to delete this video"
    );
  }


   // 3) Respond
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Video deleted successfully"));

})

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user?._id;

  // 1) Validate input
  if (!videoId) {
    throw new ApiError(400, "Video ID is required");
  }
  if (!mongoose.isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid Video ID format");
  }
  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  // 2) Find the video (must be owned by the user)
  const video = await Video.findOne({ _id: videoId, owner: userId });

  if (!video) {
    throw new ApiError(404, "Video not found or you are not allowed to update this video");
  }

  // 3) Toggle publish status
  video.isPublished = !video.isPublished;
  await video.save();

  // 4) Respond
  return res.status(200).json(
    new ApiResponse(
      200,
      { videoId: video._id, isPublished: video.isPublished },
      `Video ${video.isPublished ? "published" : "unpublished"} successfully`
    )
  );
});


export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}