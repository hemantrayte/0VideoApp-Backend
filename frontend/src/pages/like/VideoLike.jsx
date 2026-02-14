import React from "react";
import api from "../../Api/api";

const VideoLike = ({ id }) => {

  const handleLike = async () => {
    try {
      const response = await api.post(`/likes/toggle/v/${id}`);
      console.log(response.data);
    } catch (error) {
      console.log("Error liking video", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <button onClick={handleLike}>Like</button>
    </div>
  );
};

export default VideoLike;


// import React from "react";
// import api from "../../Api/api";

// const VideoLike = () => {
//   const handleLike = async ({ id }) => {
//     try {
//       const response = await api.post(`/likes/toggle/v/${id}`);

//       console.log(response.data);
//     } catch (error) {
//       console.log("Error liking video", error.response);
//     }
//   };
//   return (
//     <div>
//       <button onClick={handleLike}>Like</button>
//     </div>
//   );
// };

// export default VideoLike;
