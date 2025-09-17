import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { useNavigate, useParams } from "react-router-dom";

const UsersPlaylist = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [playlistData, setPlaylistData] = useState([]);

  const userPlaylist = async () => {
    try {
      const response = await api.get(`/playlist/user/${id}`);
      setPlaylistData(response.data.data);
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  useEffect(() => {
    userPlaylist();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          User’s Playlists
        </h1>

        {playlistData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlistData.map((playlist) => (
              <div
                key={playlist._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden"
                onClick={() => navigate(`/playlist/${playlist._id}`)}
              >
                {/* Playlist Thumbnail (fallback color block if no image) */}
                <div className="relative w-full h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">
                    📂 {playlist.videos?.length || 0} videos
                  </span>
                </div>

                {/* Playlist Info */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold truncate hover:text-red-500">
                    {playlist.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                    {playlist.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Created on{" "}
                    {new Date(playlist.createdAt).toLocaleDateString()}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/playlist/${playlist._id}`);
                    }}
                    className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition"
                  >
                    See Videos
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-lg text-center text-gray-600 dark:text-gray-400">
            No playlists found...
          </h1>
        )}
      </div>
    </div>
  );
};

export default UsersPlaylist;
