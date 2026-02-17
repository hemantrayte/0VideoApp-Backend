import React, { useState } from "react";
import api from "../../Api/api"; // Import axios instance for making API requests
import { useNavigate } from "react-router-dom"; // Import hook for navigation

const Token = () => {

  // State to store success or error message
  const [message, setMessage] = useState("");

  // State to track whether the message is an error or success
  const [isError, setIsError] = useState(false);

  // Hook to navigate user to different routes
  const navigate = useNavigate();

  // Function to handle refresh token generation
  const handleClick = async () => {
    try {
      // Send POST request to backend to generate new refresh token
      const response = await api.post("/users/refresh-token", {});

      // Set success message from response
      setMessage(response.data.message || "New refresh token generated!");

      // Set error state to false since request was successful
      setIsError(false);

      // Redirect user to home page after 1.5 seconds delay
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {

      // Set error message if request fails
      setMessage(error.response?.data?.message || "Failed to generate token");

      // Set error state to true to show error styling
      setIsError(true);
    }
  };

  return (
    // Main container with center alignment and dark/light mode support
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Card container for token refresh UI */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md text-center">

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Refresh Token
        </h2>

        {/* Message Box to show success or error message */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-lg font-medium ${
              isError
                ? "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300" // Error styling
                : "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300" // Success styling
            }`}
          >
            {message}
          </div>
        )}

        {/* Button to trigger refresh token API call */}
        <button
          onClick={handleClick}
          className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition duration-200"
        >
          Generate New Refresh Token
        </button>

      </div>
    </div>
  );
};

export default Token; // Export component for use in routing


// import React, { useState } from "react";
// import api from "../../Api/api";
// import { useNavigate } from "react-router-dom";

// const Token = () => {
//   const [message, setMessage] = useState("");
//   const [isError, setIsError] = useState(false);

//   const navigate = useNavigate();

//   const handleClick = async () => {
//     try {
//       const response = await api.post("/users/refresh-token", {});
//       setMessage(response.data.message || "New refresh token generated!");
//       setIsError(false);

//       // Optional: redirect after short delay
//       setTimeout(() => {
//         navigate("/");
//       }, 1500);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to generate token");
//       setIsError(true);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
//       <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
//           Refresh Token
//         </h2>

//         {/* ✅ Message Box */}
//         {message && (
//           <div
//             className={`mb-4 p-3 rounded-lg font-medium ${
//               isError
//                 ? "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300"
//                 : "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         {/* ✅ Button */}
//         <button
//           onClick={handleClick}
//           className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition duration-200"
//         >
//           Generate New Refresh Token
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Token;
