
import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";

const CurrentUser = () => {

  // State to store current logged-in user data
  const [currentUser, setCurrentUser] = useState(null);

  // Hook to navigate between pages
  const navigate = useNavigate();

  // Function to fetch current user from backend API
  const fetchUser = async () => {
    try {
      // API call to get logged-in user details
      const response = await api.get("users/current-user");

      // Log user data (for debugging)
      console.log(response.data.data);

      // Store user data in state
      setCurrentUser(response.data.data);

    } catch (error) {
      // Log error if API fails
      console.log("User not fetched", error);
    }
  };

  // useEffect runs once when component loads
  useEffect(() => {
    fetchUser(); // fetch current user profile
  }, []);

  // Show loading or fallback UI if user not fetched yet
  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
          Profile Not Fetched
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6">

      {/* Profile Card Container */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl w-full max-w-md overflow-hidden">

        {/* Cover Image Section (only shown if coverImage exists) */}
        {currentUser.coverImage && (
          <div className="h-32 w-full">
            <img
              src={currentUser.coverImage} // cover image URL
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Profile Content */}
        <div className="p-8 text-center">

          {/* User Avatar */}
          <img
            src={currentUser.avatar} // avatar image URL
            alt={currentUser.username}
            className="w-32 h-32 rounded-full mx-auto border-4 border-red-600 shadow-md -mt-16 bg-white dark:bg-gray-700"
          />

          {/* Username */}
          <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            {currentUser.username}
          </h1>

          {/* Full Name */}
          <h3 className="text-gray-600 dark:text-gray-400 text-lg">
            {currentUser.fullName}
          </h3>

          {/* Email Address */}
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {currentUser.email}
          </p>

          {/* Button to navigate to Update Profile page */}
          <button
            onClick={() => navigate("/user/update")}
            className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 shadow transition duration-200"
          >
            Update Profile
          </button>

          <br />

          {/* Button to navigate to Channel Profile page using username */}
          <button
            onClick={() => navigate(`/channel/profile/${currentUser.username}`)}
            className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 shadow transition duration-200"
          >
            Channel Profile
          </button>

          <br />

          {/* Button to navigate to User Playlists page using user ID */}
          <button
            onClick={() => navigate(`/playlist/user/${currentUser._id}`)}
            className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 shadow transition duration-200"
          >
            User Playlist
          </button>

        </div>
      </div>
    </div>
  );
};

export default CurrentUser;



// import React, { useEffect, useState } from "react";
// import api from "../../Api/api";
// import { useNavigate } from "react-router-dom";

// const CurrentUser = () => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate();

//   const fetchUser = async () => {
//     try {
//       const response = await api.get("users/current-user");
//       console.log(response.data.data);
//       setCurrentUser(response.data.data);
//     } catch (error) {
//       console.log("User not fetched", error);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   if (!currentUser) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <h1 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
//           Profile Not Fetched
//         </h1>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
//       <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl w-full max-w-md overflow-hidden">
//         {/* Cover Image (show only if backend sends it) */}
//         {currentUser.coverImage && (
//           <div className="h-32 w-full">
//             <img
//               src={currentUser.coverImage}
//               alt="Cover"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         )}

//         {/* Profile Content */}
//         <div className="p-8 text-center">
//           {/* Avatar */}
//           <img
//             src={currentUser.avatar}
//             alt={currentUser.username}
//             className="w-32 h-32 rounded-full mx-auto border-4 border-red-600 shadow-md -mt-16 bg-white dark:bg-gray-700"
//           />

//           {/* Username */}
//           <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
//             {currentUser.username}
//           </h1>

//           {/* Full Name */}
//           <h3 className="text-gray-600 dark:text-gray-400 text-lg">
//             {currentUser.fullName}
//           </h3>

//           {/* Email */}
//           <p className="text-gray-500 dark:text-gray-400 mt-2">
//             {currentUser.email}
//           </p>

//           {/* Update Button */}
//           <button
//             onClick={() => navigate("/user/update")}
//             className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 shadow transition duration-200"
//           >
//             Update Profile
//           </button>
//           <br />
//           <button
//             onClick={() => navigate(`/channel/profile/${currentUser.username}`)}
//             className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 shadow transition duration-200"
//           >
//             Channel Profile
//           </button>
//           <br />
//           <button
//             onClick={() => navigate(`/playlist/user/${currentUser._id}`)}
//             className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 shadow transition duration-200"
//           >
//             User Playlist
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CurrentUser;
