import React, { useState } from "react";
import api from "../../Api/api";

const CreateTweet = () => {
  const [tweet, setTweet] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/tweets",
        { content: tweet }, // send JSON object
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage(response.data.message);
      console.log(response.data)
      setTweet(""); // clear after posting
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <form onSubmit={handleSubmit} className="flex space-x-4">
        {/* Profile Avatar */}
        <img
          src="https://ui-avatars.com/api/?name=Hemant+Rayte"
          alt="profile"
          className="w-12 h-12 rounded-full object-cover"
        />

        {/* Input and Button */}
        <div className="flex-1">
          <textarea
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            placeholder="What's happening?"
            className="w-full resize-none border-b border-gray-200 dark:border-gray-600 focus:outline-none bg-transparent text-gray-900 dark:text-gray-100 p-2"
            rows="2"
          />

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={!tweet.trim()}
              className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded-full transition"
            >
              Post
            </button>
          </div>
        </div>
      </form>

      {/* Message */}
      {message && (
        <p className="mt-3 text-sm text-center text-green-600 dark:text-green-400">
          {message}
        </p>
      )}
    </div>
  );
};

export default CreateTweet;
