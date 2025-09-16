import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { useNavigate, useParams } from "react-router-dom";

const PlaylistById = () => {
  const [playList, setPlaylist] = useState(null);
  const [videos, setVideos] = useState([]);
  const [playingVideoId, setPlayingVideoId] = useState(null); // track which video is playing
  const { id } = useParams();
  const navigate = useNavigate();

  const playListById = async () => {
    try {
      const response = await api.get(`/playlist/${id}`);
      setPlaylist(response.data.data);
      setVideos(response.data.data.videos);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleClick = () => {
    navigate(`/playlist/update/${id}`)
  }

  useEffect(() => {
    playListById();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      {playList ? (
        <div className="max-w-6xl mx-auto">
          {/* Playlist Header */}
          <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-6 mb-8 shadow-lg">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {playList.name}
            </h1>
            <p className="text-gray-100 mb-2">{playList.description}</p>
            <p className="text-sm text-gray-200">
              {videos.length} videos •{" "}
              {new Date(playList.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Videos Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
              >
                {/* Thumbnail OR Video */}
                <div className="relative">
                  {playingVideoId === video._id ? (
                    <video
                      controls
                      autoPlay
                      className="w-full h-40 object-cover"
                      src={video.videoFile}
                    />
                  ) : (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-40 object-cover cursor-pointer"
                      onClick={() => setPlayingVideoId(video._id)}
                    />
                  )}

                  {/* Duration (only on thumbnail) */}
                  {playingVideoId !== video._id && (
                    <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {video.duration || "0:00"}
                    </span>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <h3
                    className="font-semibold text-base line-clamp-2 hover:text-red-500 cursor-pointer"
                    onClick={() => setPlayingVideoId(video._id)}
                  >
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                    {video.description}
                  </p>
                </div>
                <button
                onClick={handleClick}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >Update Playlist</button>
              </div>
              
            ))}
          </div>
        </div>
      ) : (
        <h1 className="text-center text-lg">Loading playlist...</h1>
      )}
    </div>
  );
};

export default PlaylistById;
