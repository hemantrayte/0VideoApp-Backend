import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body
    const userId = req.user?._id; // from auth middleware
    //TODO: create playlist

    if (!name || !description) {
      throw new ApiError(400, "Name and description are required");
    }

    const playList = await Playlist.create({
      name:name,
      description:description,
      owner:userId,
      videos: [] // initially empty
    })

    return res.status(201).json(
      new ApiResponse(201, playList, "Playlist created successfully")
    );
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    //TODO: get user playlists

    if (!userId) {
      throw new ApiError(400, "User ID is required");
    }

    const userPlaylists = await Playlist.find({ owner: userId });

    if (userPlaylists.length === 0) {
      throw new ApiError(404, "No playlists found for this user");
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        userPlaylists,
        "User playlists fetched successfully"
      )
    );
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id

    if(!playlistId) {
      throw new ApiError(400, "Playlist ID is required")
    }

    const playlistById = await Playlist.findById(playlistId).populate("videos");

   if (!playlistById) {
    throw new ApiError(404, "Playlist not found")
   }

   return res.status(200).json(
    new ApiResponse(
      200,
      playlistById,
      "playlist fetched successfully"
    )
   )
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    const userId = req.user?._id; // from auth middleware

    if (!playlistId) {
      throw new ApiError(400, "playlist ID not required")
    }

    if(!videoId) {
      throw new ApiError(400, "video ID not required")
    }

    if(!userId) {
      throw new ApiError(400, "user ID is required")
    }

    //find the playlist and update
    const playList = await Playlist.findByIdAndUpdate(
      { _id:playlistId, owner:userId}, //ensure only owner can add
      {$addToSet:{videos:videoId}}, //addToSet prevent duplicates
      {new:true} // return updated playlist
    ).populate("videos")

    if (!playList) {
      throw new ApiError(404, "Playlist not found or you are not the owner");
    }
  
    return res.status(200).json(
      new ApiResponse(
        200,
        playList,
        "Video added to playlist successfully"
      )
    );
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  
  const { playlistId, videoId } = req.params;
  const userId = req.user?._id;

  if (!playlistId || !videoId) throw new ApiError(400, "Playlist ID and Video ID are required");

  // 1) fetch to check existence + ownership + whether video exists in playlist
  const playlist = await Playlist.findOne({ _id: playlistId, owner: userId });

  if (!playlist) throw new ApiError(404, "Playlist not found or not owned by user");


  // 2) remove the video
  const updated = await Playlist.findOneAndUpdate(
    { _id: playlistId, owner: userId },
    { $pull: { videos: videoId } },
    { new: true, runValidators: true }
  ).populate("videos", "title thumbnail");

  return res.status(200).json(new ApiResponse(200, updated, "Video removed from playlist"));
});

// const deletePlaylist = asyncHandler(async (req, res) => {
//   const { playlistId } = req.params;
//   const userId = req.user?._id;

//   if (!playlistId) {
//     throw new ApiError(400, "Playlist ID is required");
//   }

//   if (!userId) {
//     throw new ApiError(400, "User ID is required");
//   }

//   // Find playlist owned by this user
//   const playlist = await Playlist.findOne({ _id: playlistId, owner: userId });

//   if (!playlist) {
//     throw new ApiError(404, "Playlist not found or not owned by user");
//   }

//   await playlist.deleteOne();

//   return res
//     .status(200)
//     .json(new ApiResponse(200, {}, "Playlist deleted successfully"));
// });

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const userId = req.user?._id;

  if (!playlistId || !userId) {
    throw new ApiError(400, "Playlist ID and User ID are required");
  }

  // Delete directly if found & owned by user
  const playlist = await Playlist.findOneAndDelete({
    _id: playlistId,
    owner: userId,
  });

  if (!playlist) {
    throw new ApiError(404, "Playlist not found or not owned by user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Playlist deleted successfully"));
});


const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    const userId = req.user?._id;

    //TODO: update playlist

    if(!playlistId) {
      throw new ApiError(404, "Playlist Id is required")
    }

    const playList = await Playlist.findByIdAndUpdate(
      { _id: playlistId, owner: userId }, // ensure only owner can update
      { $set: { name, description } },    // update fields
      { new: true, runValidators: true }  // return updated doc + validate
    )

    if (!playList) {
      throw new ApiError(404, "Playlist not found or not owned by user");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, playList, "Playlist update successfully"));
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}