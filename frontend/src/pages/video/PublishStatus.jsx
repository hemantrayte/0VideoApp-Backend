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
