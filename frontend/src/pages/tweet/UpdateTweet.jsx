import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../Api/api';

const UpdateTweet = () => {
  const { id } = useParams();
  const [updateTweet, setUpdateTweet] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.patch(
        `/tweets/${id}`,
        { content: updateTweet },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(response.data.message);
      navigate(`/tweets/${id}`);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-black text-white rounded-lg shadow-lg p-6 mt-10">
      <h1 className="text-xl font-bold mb-4">Update Tweet</h1>

      {/* Message (Success or Error) */}
      {message && (
        <p
          className={`mb-4 text-sm font-medium ${
            message.toLowerCase().includes("success")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={updateTweet}
          onChange={(e) => setUpdateTweet(e.target.value)}
          placeholder="Update your tweet..."
          className="w-full border border-gray-600 rounded-lg p-3 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          type="submit"
          disabled={!updateTweet.trim()}
          className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          Update Tweet
        </button>
      </form>
    </div>
  );
};

export default UpdateTweet;
