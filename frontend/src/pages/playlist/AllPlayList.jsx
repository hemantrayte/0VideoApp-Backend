import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";

const AllPlayList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const allPlaylist = async () => {
    try {
      const response = await api.get("/playlist");
      console.log(response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    allPlaylist();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          All Playlists
        </h1>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((playlist) => (
              <div
                key={playlist._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
                onClick={() => navigate(`/playlist/${playlist._id}`)}
              >
                {/* Playlist Thumbnail (You can set first video’s thumbnail or placeholder) */}
                <div className="relative">
                  <img
                    src={
                      playlist.thumbnail ||
                      "https://via.placeholder.com/300x180.png?text=Playlist"
                    }
                    alt={playlist.name}
                    className="w-full h-40 object-cover"
                  />
                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {playlist.videos?.length || 0} videos
                  </span>
                </div>

                {/* Playlist Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-base mb-1 line-clamp-1 text-gray-900 dark:text-white">
                    {playlist.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {playlist.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Created on {new Date(playlist.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-lg text-gray-600 dark:text-gray-300">
            Loading playlists...
          </h1>
        )}
      </div>
    </div>
  );
};

export default AllPlayList;
