
import React, { useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  // Hook to navigate programmatically between routes
  const navigate = useNavigate();

  // State to store old and new password values
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  // State to store success or error message
  const [message, setMessage] = useState("");

  // State to track whether the message is an error or success
  const [isError, setIsError] = useState(false);

  // Handle input field changes dynamically
  const handleInputChange = (e) => {
    setPasswords({
      ...passwords, // keep existing values
      [e.target.name]: e.target.value, // update specific field
    });
  };

  // Handle password change form submission
  const handleSubmitPassword = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      // Send POST request to change password endpoint
      const response = await api.post("/users/change-password", passwords, {
        headers: { "Content-Type": "application/json" },
      });

      // Show success message
      setMessage(response.data.message || "Password changed successfully!");

      // Mark as success (not error)
      setIsError(false);

      // Redirect user to current-user page after 1.5 seconds
      setTimeout(() => {
        navigate("/user/current-user");
      }, 1500);

    } catch (error) {
      // Extract error message from response or use default message
      const errMsg =
        error.response?.data?.message || "Error while changing password";

      // Show error message
      setMessage(errMsg);

      // Mark as error
      setIsError(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md">

        {/* Page Title */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Change Password
        </h2>

        {/* Message Display (Success or Error) */}
        {message && (
          <div
            className={`mb-4 text-center font-medium p-2 rounded-lg ${
              isError
                ? "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300"
                : "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300"
            }`}
          >
            {message}
          </div>
        )}

        {/* Change Password Form */}
        <form onSubmit={handleSubmitPassword} className="space-y-4">

          {/* Old Password Input Field */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Old Password
            </label>
            <input
              type="password"
              onChange={handleInputChange}
              value={passwords.oldPassword}
              name="oldPassword"
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* New Password Input Field */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              onChange={handleInputChange}
              value={passwords.newPassword}
              name="newPassword"
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition duration-200"
          >
            Change Password
          </button>

        </form>
      </div>
    </div>
  );
};

export default ChangePassword;


// import React, { useState } from "react";
// import api from "../../Api/api";
// import { useNavigate } from "react-router-dom";

// const ChangePassword = () => {
//   const navigate = useNavigate();

//   const [passwords, setPasswords] = useState({
//     oldPassword: "",
//     newPassword: "",
//   });

//   const [message, setMessage] = useState("");
//   const [isError, setIsError] = useState(false);

//   const handleInputChange = (e) => {
//     setPasswords({
//       ...passwords,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmitPassword = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post("/users/change-password", passwords, {
//         headers: { "Content-Type": "application/json" },
//       });

//       setMessage(response.data.message || "Password changed successfully!");
//       setIsError(false);

//       // redirect after short delay
//       setTimeout(() => {
//         navigate("/user/current-user");
//       }, 1500);
//     } catch (error) {
//       const errMsg =
//         error.response?.data?.message || "Error while changing password";
//       setMessage(errMsg);
//       setIsError(true);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
//       <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
//           Change Password
//         </h2>

//         {/* ✅ Message Display */}
//         {message && (
//           <div
//             className={`mb-4 text-center font-medium p-2 rounded-lg ${
//               isError
//                 ? "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300"
//                 : "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmitPassword} className="space-y-4">
//           {/* Old Password */}
//           <div>
//             <label className="block text-gray-700 dark:text-gray-300 mb-1">
//               Old Password
//             </label>
//             <input
//               type="password"
//               onChange={handleInputChange}
//               value={passwords.oldPassword}
//               name="oldPassword"
//               required
//               className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//             />
//           </div>

//           {/* New Password */}
//           <div>
//             <label className="block text-gray-700 dark:text-gray-300 mb-1">
//               New Password
//             </label>
//             <input
//               type="password"
//               onChange={handleInputChange}
//               value={passwords.newPassword}
//               name="newPassword"
//               required
//               className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition duration-200"
//           >
//             Change Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChangePassword;
