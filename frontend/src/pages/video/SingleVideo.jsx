import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../Api/api";

const SingleVideo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchSingleVideo = async () => {
    try {
      const response = await api.get(`/videos/${id}`);
      setVideo(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await api.get("/users/current-user"); // make sure you have this API
      setCurrentUser(res.data.data);
    } catch (error) {
      console.log("Could not fetch current user", error);
    }
  };

  useEffect(() => {
    fetchSingleVideo();
    fetchCurrentUser();
  }, [id]);

  if (!video) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
          Loading video...
        </h1>
      </div>
    );
  }

  const isOwner = currentUser?._id === video.owner._id;

  return (
    <div className="flex flex-col lg:flex-row max-w-6xl mx-auto p-4 space-y-6 lg:space-y-0 lg:space-x-6">
      {/* Left: Video Player + Info */}
      <div className="flex-1">
        {/* Video Player */}
        <video
          src={video.videoFile}
          controls
          poster={video.thumbnail}
          className="w-full rounded-xl shadow-lg"
        ></video>

        {/* Title */}
        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
          {video.title}
        </h1>

        {/* Views + Date */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {video.views} views • {new Date(video.createdAt).toDateString()}
        </p>

        {/* Channel Info */}
        <div className="flex items-center justify-between mt-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <img
              src={video.owner.avatar}
              alt={video.owner.username}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {video.owner.username}
              </h4>
              <p className="text-sm text-gray-500">{video.owner.fullName}</p>
            </div>
          </div>


          <div className="flex items-center space-x-3">
            {isOwner ? (
              <button
                onClick={() => navigate(`/videos/update/${video._id}`)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-yellow-600 transition"
              >
                Update
              </button>
            ) : (
              <button className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition">
                Subscribe
              </button>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-800 dark:text-gray-200">
            {video.description}
          </p>
        </div>
      </div>

      {/* Right: Suggested videos (Placeholder) */}
      <div className="w-full lg:w-80">
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
          Suggested Videos
        </h2>
        <div className="space-y-4">
          <div className="flex space-x-3">
            <img
              src={video.thumbnail}
              alt="suggested"
              className="w-32 h-20 rounded-lg object-cover"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Sample Video
              </p>
              <p className="text-sm text-gray-500">Channel Name</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleVideo;
