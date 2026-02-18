// import React, { useState } from "react";
// import api from "../../Api/api";
// import { useParams, useNavigate } from "react-router-dom";

// const DeleteVideo = () => {
//   const [message, setMessage] = useState("");
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const handleDelete = async () => {
//     try {
//       const response = await api.delete(`/videos/${id}`);
//       setMessage(response.data.message || "Video deleted successfully!");
//       console.log(response.data);
//       // Redirect after delete
//       setTimeout(() => {
//         navigate("/");
//       }, 1500);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to delete video.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
//           Delete Video?
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400 mb-6">
//           Are you sure you want to delete this video? This action cannot be
//           undone.
//         </p>

//         {/* Action Buttons */}
//         <div className="flex gap-4 justify-center">
//           <button
//             onClick={handleDelete}
//             className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition duration-200"
//           >
//             Delete
//           </button>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition duration-200"
//           >
//             Cancel
//           </button>
//         </div>

//         {/* Message */}
//         {message && (
//           <p
//             className={`mt-6 text-sm font-medium ${
//               message.toLowerCase().includes("fail")
//                 ? "text-red-600"
//                 : "text-green-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DeleteVideo;
