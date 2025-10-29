import React, { useState } from "react";
import api from "../../Api/api";

const AddCommentVideo = ({ id, onCommentAdded }) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await api.post(
        `/comments/${id}`,
        {
          content: newComment,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setNewComment("");
      console.log(res.data.data);
      if (onCommentAdded) onCommentAdded();
    } catch (error) {
      console.log("Error posting comment", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit} className="mb-4 flex space-x-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 p-2 border rounded-lg dark:bg-gray-900 dark:text-white"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddCommentVideo;
