import React, { useState, useEffect } from "react";
import api from "../../Api/api";
import { useNavigate, useParams } from "react-router-dom";

const PublishStatus = () => {

  // State to store success or error message
  const [message, setMessage] = useState("");

  // State to track whether video is published or private
  // null = loading, true = public, false = private
  const [isPublished, setIsPublished] = useState(null);

  // Get video id from URL parameters
  const { id } = useParams();

  // Hook to navigate to another page programmatically
  const navigate = useNavigate();


  // Function to fetch current video publish status from backend
  const fetchStatus = async () => {
    try {
      // API call to get video details
      const response = await api.get(`/videos/${id}`);

      // Update publish status state
      setIsPublished(response.data.data.isPublished);

    } catch (error) {
      // Handle error and show message
      setMessage(
        error.response?.data?.message || "Failed to fetch video status"
      );
    }
  };


  // Function to toggle publish status (Public <-> Private)
  const handleStatus = async () => {
    try {
      // API call to toggle publish status
      const response = await api.patch(`/videos/toggle/publish/${id}`);

      // Show success message
      setMessage(response.data.message);

      // Update publish status instantly in UI
      setIsPublished(response.data.isPublished);

      // Navigate back to video page after 1.5 seconds
      setTimeout(() => {
        navigate(`/videos/${id}`);
      }, 1500);

    } catch (error) {
      // Handle error and show message
      setMessage(error.response?.data?.message || "Error updating status");
    }
  };


  // useEffect runs when component loads
  // It fetches the current publish status
  useEffect(() => {
    fetchStatus();
  }, []);


  return (
    // Main container with centered content and dark theme
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">

      {/* Display current publish status */}
      <h1 className="text-xl font-semibold mb-4">
        {isPublished === null
          ? "Loading video status..."        // Show while loading
          : isPublished
            ? "This video is currently Public"   // If published
            : "This video is currently Private"} // If private
      </h1>

      {/* Button to toggle publish status */}
      <button
        onClick={handleStatus}
        className={`px-6 py-2 rounded-lg font-medium shadow-md transition-all duration-300 ${
          isPublished
            ? "bg-red-600 hover:bg-red-700"    // Red button if public (Make Private)
            : "bg-green-600 hover:bg-green-700" // Green button if private (Make Public)
        }`}
      >
        {isPublished ? "Make Private" : "Make Public"}
      </button>

      {/* Display success or error message */}
      {message && (
        <p className="mt-4 text-sm text-gray-300">
          {message}
        </p>
      )}

    </div>
  );
};

export default PublishStatus;



// import React, { useState, useEffect } from "react";
// import api from "../../Api/api";
// import { useNavigate, useParams } from "react-router-dom";

// const PublishStatus = () => {
//   const [message, setMessage] = useState("");
//   const [isPublished, setIsPublished] = useState(null); // track publish status
//   const { id } = useParams();

//   const navigate = useNavigate();

//   // fetch current video status
//   const fetchStatus = async () => {
//     try {
//       const response = await api.get(`/videos/${id}`);
//       setIsPublished(response.data.data.isPublished);
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message || "Failed to fetch video status"
//       );
//     }
//   };

//   // toggle publish status
//   const handleStatus = async () => {
//     try {
//       const response = await api.patch(`/videos/toggle/publish/${id}`);
//       setMessage(response.data.message);
//       setIsPublished(response.data.isPublished); // update UI instantly
//       // Navigate back after success
//       setTimeout(() => {
//         navigate(`/videos/${id}`);
//       }, 1500);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Error updating status");
//     }
//   };

//   useEffect(() => {
//     fetchStatus();
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
//       <h1 className="text-xl font-semibold mb-4">
//         {isPublished === null
//           ? "Loading video status..."
//           : isPublished
//             ? "This video is currently Public"
//             : "This video is currently Private"}
//       </h1>

//       <button
//         onClick={handleStatus}
//         className={`px-6 py-2 rounded-lg font-medium shadow-md transition-all duration-300 ${
//           isPublished
//             ? "bg-red-600 hover:bg-red-700"
//             : "bg-green-600 hover:bg-green-700"
//         }`}
//       >
//         {isPublished ? "Make Private" : "Make Public"}
//       </button>

//       {message && <p className="mt-4 text-sm text-gray-300">{message}</p>}
//     </div>
//   );
// };

// export default PublishStatus;
