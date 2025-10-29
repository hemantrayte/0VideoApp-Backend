// import React, { useState } from "react";
// import api from "../../Api/api";

// const CreateTweet = () => {
//   const [tweet, setTweet] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post(
//         "/tweets",
//         { content: tweet }, // send JSON object
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setMessage(response.data.message);
//       console.log(response.data)
//       setTweet(""); // clear after posting
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-4">
//       <form onSubmit={handleSubmit} className="flex space-x-4">
//         {/* Profile Avatar */}
//         <img
//           src="https://ui-avatars.com/api/?name=Hemant+Rayte"
//           alt="profile"
//           className="w-12 h-12 rounded-full object-cover"
//         />

//         {/* Input and Button */}
//         <div className="flex-1">
//           <textarea
//             value={tweet}
//             onChange={(e) => setTweet(e.target.value)}
//             placeholder="What's happening?"
//             className="w-full resize-none border-b border-gray-200 dark:border-gray-600 focus:outline-none bg-transparent text-gray-900 dark:text-gray-100 p-2"
//             rows="2"
//           />

//           <div className="flex justify-end mt-2">
//             <button
//               type="submit"
//               disabled={!tweet.trim()}
//               className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded-full transition"
//             >
//               Post
//             </button>
//           </div>
//         </div>
//       </form>

//       {/* Message */}
//       {message && (
//         <p className="mt-3 text-sm text-center text-green-600 dark:text-green-400">
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default CreateTweet;

import React, { useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [post, setPost] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/tweets",
        { content: post }, // assuming backend expects {content}
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage(response.data.message);
      setPost(""); // clear input
      navigate("/tweets");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow rounded-lg p-4 mt-6">
      <div className="flex space-x-4">
        {/* Avatar */}
        <img
          src="https://ui-avatars.com/api/?name=Hemant+Rayte"
          alt="profile"
          className="w-12 h-12 rounded-full object-cover"
        />

        {/* Post Input */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <textarea
            value={post}
            onChange={(e) => setPost(e.target.value)}
            placeholder="Share something with your community..."
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
            rows="3"
          />

          {/* Actions */}
          <div className="flex justify-between items-center mt-2">
            <div className="flex space-x-2 text-gray-500 dark:text-gray-400 text-sm">
              {/* You can add icons like image/video here */}
              <span className="cursor-pointer hover:text-red-600 transition">
                📷 Image
              </span>
              <span className="cursor-pointer hover:text-red-600 transition">
                🎥 Video
              </span>
            </div>

            <button
              type="submit"
              disabled={!post.trim()}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-full font-semibold transition"
            >
              Post
            </button>
          </div>

          {/* Message */}
          {message && (
            <p className="mt-2 text-sm text-green-600 dark:text-green-400">
              {message}
            </p>
          )}
        </form>
      </div>
      {/* Your Tweets Button */}
      {/* {currentUser && (
  <button
    onClick={() => navigate(`/tweets/${currentUser._id}`)}
    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-semibold transition mt-4"
  >
    Your Tweets
  </button>
)} */}
    </div>
  );
};

export default CreatePost;
