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
