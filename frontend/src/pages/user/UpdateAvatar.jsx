import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/api"; // Axios helper for making API requests

const UpdateAvatar = () => {

  // State to store selected avatar file
  const [avatar, setAvatar] = useState(null);

  // State to store success or error message
  const [message, setMessage] = useState("");

  // Hook used to navigate between routes
  const navigate = useNavigate();


  // Handle file input change event
  // Stores the selected image file in avatar state
  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]); // Get first selected file
  };


  // Handle avatar form submission
  const handleAvatarSubmit = async (e) => {

    e.preventDefault(); // Prevent page reload

    // Validate if user selected an avatar file
    if (!avatar) {
      setMessage("Please select an image to upload.");
      return;
    }

    try {

      // Create FormData object to send file to backend
      const formData = new FormData();

      // Append avatar file to FormData
      formData.append("avatar", avatar);

      // Send PATCH request to backend to update avatar
      const res = await api.patch("/users/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Set success message from backend response
      setMessage(res.data.message || "User Avatar updated successfully!");

      // Show alert confirmation
      alert("User Avatar updated successfully!");

      // Redirect user to current user profile page
      navigate("/user/current-user");

    } catch (error) {

      // Log error for debugging
      console.error("Error while updating avatar:", error);

      // Show error message from backend or default message
      setMessage(error.response?.data?.message || "Failed to update avatar");
    }
  };


  return (

    // Main container with center alignment
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">

      {/* Card container */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">

        {/* Page title */}
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Update Avatar
        </h1>


        {/* Avatar update form */}
        <form onSubmit={handleAvatarSubmit} className="space-y-4">

          {/* File input field for avatar image */}
          <input
            type="file"
            name="avatar"
            accept="image/*" // Only allow image files
            onChange={handleFileChange}
            className="w-full text-sm border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />


          {/* Submit button to update avatar */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition duration-200"
          >
            Update Avatar
          </button>

        </form>


        {/* Display success or error message */}
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              
              // Check if message contains success keyword
              message.toLowerCase().includes("success")
                ? "text-green-600 dark:text-green-400" // Success message style
                : "text-red-600 dark:text-red-400" // Error message style

            }`}
          >
            {message}
          </p>
        )}

      </div>
    </div>
  );
};

export default UpdateAvatar; // Export component for use in routing


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../Api/api";

// const UpdateAvatar = () => {
//   const [avatar, setAvatar] = useState(null);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     setAvatar(e.target.files[0]); // directly store file
//   };

//   const handleAvatarSubmit = async (e) => {
//     e.preventDefault();

//     if (!avatar) {
//       setMessage("Please select an image to upload.");
//       return;
//     }

//     try {
//       // Create FormData and append the file
//       const formData = new FormData();
//       formData.append("avatar", avatar);

//       const res = await api.patch("/users/avatar", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setMessage(res.data.message || "User Avatar updated successfully!");
//       alert("User Avatar updated successfully!");
//       navigate("/user/current-user");
//     } catch (error) {
//       console.error("Error while updating avatar:", error);
//       setMessage(error.response?.data?.message || "Failed to update avatar");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
//       <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
//         <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
//           Update Avatar
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
//             Update Avatar
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

// export default UpdateAvatar;
