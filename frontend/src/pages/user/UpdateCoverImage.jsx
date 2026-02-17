


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../Api/api";

// const UpdateCoverImage = () => {
//   const [coverImage, setCoverImage] = useState(null);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     setCoverImage(e.target.files[0]); // directly store file
//   };

//   const handleAvatarSubmit = async (e) => {
//     e.preventDefault();

//     if (!coverImage) {
//       setMessage("Please select an image to upload.");
//       return;
//     }

//     try {
//       // Create FormData and append the file
//       const formData = new FormData();
//       formData.append("coverImage", coverImage);

//       const res = await api.patch("/users/cover-image", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setMessage(res.data.message || "User CoverImage updated successfully!");
//       alert("User Cover Image updated successfully!");
//       navigate("/user/current-user");
//     } catch (error) {
//       console.error("Error while updating cover image:", error);
//       setMessage(
//         error.response?.data?.message || "Failed to update cover image"
//       );
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
//       <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
//         <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
//           Update Cover Image
//         </h1>

//         <form onSubmit={handleAvatarSubmit} className="space-y-4">
//           <input
//             type="file"
//             name="avatar"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="w-full text-sm border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
//             required
//           />

//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition duration-200"
//           >
//             Update Cover Image
//           </button>
//         </form>

//         {message && (
//           <p
//             className={`mt-4 text-center font-medium ${
//               message.toLowerCase().includes("success")
//                 ? "text-green-600 dark:text-green-400"
//                 : "text-red-600 dark:text-red-400"
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UpdateCoverImage;
