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

})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist
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