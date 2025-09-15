import React, { useState } from "react";
import api from "../../Api/api";
import { useNavigate, useParams } from "react-router-dom";

const UpdateComment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch(
        `/comments/c/${id}`,
        { content: comment },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setMessage(response.data.message || "Comment updated successfully!");
      setComment("");
      setTimeout(() => navigate(-1), 1000); // wait before going back
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Edit your comment
        </h2>

        {/* Message */}
        {message && (
          <div
            className={`mb-4 text-sm ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleUpdateComment} className="space-y-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Update your comment..."
            rows="3"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-sm rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateComment;
