import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../Api/api";

const GetUserTweet = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tweets, setTweets] = useState([]);
  const [message, setMessage] = useState("");

  const fetchUserTweets = async () => {
    try {
      const response = await api.get(`/tweets/user/${id}`);
      setTweets(response.data.data);
      setMessage(""); // clear message on success
    } catch (error) {
      setTweets([]);
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchUserTweets();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold mb-4">User Tweets</h1>

        {/* Error / Message */}
        {message && (
          <p className="text-center text-red-500 font-medium">{message}</p>
        )}

        {/* Tweets */}
        {tweets.length > 0 ? (
          tweets.map((tweet) => (
            <div
              key={tweet._id}
              className="bg-gray-900 rounded-lg shadow p-4 flex space-x-4"
            >
              {/* Avatar */}
              <img
                src={tweet.owner.avatar}
                alt={tweet.owner.username}
                className="w-12 h-12 rounded-full object-cover"
              />

              {/* Tweet Content */}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-white">
                    {tweet.owner.fullName}
                  </h4>
                  <span className="text-sm text-gray-400">
                    {new Date(tweet.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-200 mt-1">{tweet.content}</p>

                {/* Actions */}
                <div className="flex space-x-4 mt-3">
                  <button
                    onClick={() => navigate(`/tweets/update/${tweet._id}`)}
                    className="px-3 py-1 text-sm rounded bg-yellow-500 hover:bg-yellow-600 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => navigate(`/tweets/delete/${tweet._id}`)}
                    className="px-3 py-1 text-sm rounded bg-red-600 hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : !message ? (
          <p className="text-center text-gray-400">Loading tweets...</p>
        ) : null}
      </div>
    </div>
  );
};

export default GetUserTweet;
