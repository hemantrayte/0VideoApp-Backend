import React, { useState } from "react";
import api from "../../Api/api";
import { useParams } from "react-router-dom";

const AddVideoToPlaylist = () => {

  // State to store success or error message from backend
  const [message, setMessage] = useState("");

  // Extract playlistID and videoID from URL parameters
  const { playlistID, videoID } = useParams();

  // Function to add a video to a playlist
  const addVideoPlaylist = async () => {
    try {
      // Send PATCH request to backend to add video to playlist
      const response = await api.patch(
        `/playlist/add/${playlistID}/${videoID}`
      );

      // Log full response for debugging
      console.log(response.data);

      // Update message state with backend success message
      setMessage(response.data.message);

    } catch (error) {
      // If request fails, show backend error message
      // If backend doesn't send one, show default message
      setMessage(
        error.response?.data?.message ||
        "Something went wrong. Please try again"
      );
    }
  };

  return (
    <div>
      {/* Button triggers video add function */}
      <button onClick={addVideoPlaylist}>
        Add Video to Playlist
      </button>

      {/* Display message if available */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddVideoToPlaylist;


// import React, { useState } from "react";
// import api from "../../Api/api";
// import { useParams } from "react-router-dom";

// const AddVideoToPlaylist = () => {
//   const [message, setMessage] = useState("");
//   const { playlistID, videoID } = useParams();

//   const addVideoPlaylist = async () => {
//     try {
//       const response = await api.patch(
//         `/playlist/add/${playlistID}/${videoID}`
//       );

//       console.log(response.data);
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message ||
//           "Something went wrong. Please try again"
//       );
//     }
//   };

//   return (
//     <div>
//       <button onClick={addVideoPlaylist}>Add Video to Playlist</button>
//     </div>
//   );
// };

// export default AddVideoToPlaylist;
