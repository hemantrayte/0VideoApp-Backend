import React, { useState } from "react";
import api from "../../Api/api";
import { useParams } from "react-router-dom";

const TweetLike = ({ initialLikes = 0, initiallyLiked = false }) => {
  const { id } = useParams();

  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initiallyLiked);
  const [loading, setLoading] = useState(false);

  const handleTweetLike = async () => {
    if (loading) return; // prevent double click spam

    try {
      setLoading(true);

      await api.post(`/likes/toggle/t/${id}`);

      // Optimistic UI update
      if (liked) {
        setLikes((prev) => prev - 1);
      } else {
        setLikes((prev) => prev + 1);
      }

      setLiked(!liked);

    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleTweetLike}
      disabled={loading}
      className={`px-4 py-2 rounded transition ${
        liked
          ? "bg-red-500 text-white"
          : "bg-gray-200 dark:bg-gray-700"
      }`}
    >
      ❤️ {likes}
    </button>
  );
};

export default TweetLike;

// import React from "react";
// import api from "../../Api/api";
// import { useParams } from "react-router-dom";

// const TweetLike = () => {
//   const { id } = useParams();
//   // const [message, setMessage] = useState(null)

//   const handleTweetLike = async () => {
//     try {
//       const response = await api.post(`/likes/toggle/t/${id}`);
//       console.log(response.data);
//       // setMessage(response.data.message)
//     } catch (error) {
//       console.log(error.response.data);
//       // setMessage(error.response.data)
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleTweetLike}>Like Tweet</button>
//     </div>
//   );
// };

// export default TweetLike;
