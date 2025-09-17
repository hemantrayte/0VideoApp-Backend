import React from "react";
import api from "../../Api/api";
import { useParams, useNavigate } from "react-router-dom";

const DeleteVideoFromPlay = () => {
  const { playlistID, videoID } = useParams();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const response = await api.delete(
        `/playlist/remove/${playlistID}/${videoID}`
      );
      console.log(response.data);
      // Redirect back to the playlist page after deletion
      navigate(`/playlist/${playlistID}`);
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Remove Video from Playlist
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to remove this video from the playlist?  
          This action cannot be undone.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleClick}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition"
          >
            Remove
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-5 py-2 rounded-lg font-medium transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteVideoFromPlay;
