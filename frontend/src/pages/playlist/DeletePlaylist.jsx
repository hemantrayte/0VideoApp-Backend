import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Api/api";

const DeletePlaylist = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const deletePlaylist = async () => {
    try {
      const response = await api.delete(`/playlist/${id}`);
      console.log(response.data);
      navigate(-1); // go back after delete
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Delete Playlist
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to delete this playlist? <br />
          This action cannot be undone.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-lg font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={deletePlaylist}
            className="px-5 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePlaylist;
