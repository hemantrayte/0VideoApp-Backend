import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../Api/api";

const DeleteTweet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const deleteTweet = async () => {
    try {
      const response = await api.delete(`/tweets/${id}`);
      setMessage(response.data.message);
      // Delay a little so user sees the message before navigation
      setTimeout(() => {
        navigate("/tweets");
      }, 1000);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to delete the tweet"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md text-center">
        <h1 className="text-xl font-semibold mb-4">
          Are you sure you want to delete this tweet?
        </h1>

        {/* Error or success message */}
        {message && (
          <p
            className={`mb-4 text-sm ${
              message.toLowerCase().includes("delete") ||
              message.toLowerCase().includes("success")
                ? "text-green-400"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <div className="flex justify-center space-x-4">
          <button
            onClick={deleteTweet}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-full font-medium transition"
          >
            Delete
          </button>
          <button
            onClick={() => navigate("/tweets")}
            className="px-5 py-2 bg-gray-600 hover:bg-gray-700 rounded-full font-medium transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTweet;
