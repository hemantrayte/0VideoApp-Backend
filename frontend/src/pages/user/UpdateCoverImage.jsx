
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/api"; // Axios helper for API requests

const UpdateCoverImage = () => {

  // State to store selected cover image file
  const [coverImage, setCoverImage] = useState(null);

  // State to store success or error message
  const [message, setMessage] = useState("");

  // Hook used to navigate between pages
  const navigate = useNavigate();


  // Handle file input change event
  // Stores the selected cover image file in state
  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]); // Get selected file
  };


  // Handle form submission for updating cover image
  const handleAvatarSubmit = async (e) => {

    e.preventDefault(); // Prevent page reload

    // Validate if user selected a cover image
    if (!coverImage) {
      setMessage("Please select an image to upload.");
      return;
    }

    try {

      // Create FormData object to send file to backend
      const formData = new FormData();

      // Append coverImage file to FormData
      formData.append("coverImage", coverImage);

      // Send PATCH request to backend API to update cover image
      const res = await api.patch("/users/cover-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Set success message from backend response
      setMessage(res.data.message || "User CoverImage updated successfully!");

      // Show confirmation alert
      alert("User Cover Image updated successfully!");

      // Redirect user to current profile page
      navigate("/user/current-user");

    } catch (error) {

      // Log error for debugging
      console.error("Error while updating cover image:", error);

      // Show error message from backend or default message
      setMessage(
        error.response?.data?.message || "Failed to update cover image"
      );
    }
  };


  return (

    // Main container centered vertically and horizontally
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">

      {/* Card container */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">

        {/* Page title */}
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Update Cover Image
        </h1>


        {/* Cover image update form */}
        <form onSubmit={handleAvatarSubmit} className="space-y-4">

          {/* File input for selecting cover image */}
          <input
            type="file"
            name="avatar"
            accept="image/*" // Accept only image files
            onChange={handleFileChange}
            className="w-full text-sm border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />


          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition duration-200"
          >
            Update Cover Image
          </button>

        </form>


        {/* Display success or error message */}
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              
              // Check if message indicates success
              message.toLowerCase().includes("success")
                ? "text-green-600 dark:text-green-400" // Success style
                : "text-red-600 dark:text-red-400" // Error style

            }`}
          >
            {message}
          </p>
        )}

      </div>
    </div>
  );
};

export default UpdateCoverImage; // Export component for routing


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
