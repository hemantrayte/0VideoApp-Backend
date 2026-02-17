import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../Api/api";

const ChannelProfile = () => {

  // State to store success or error message
  const [message, setMessage] = useState("");

  // State to store channel profile data
  const [data, setData] = useState(null);

  // Get username from URL params (example: /channel/:username)
  const { username } = useParams();

  // State to store currently logged-in user
  const [currentUser, setCurrentUser] = useState(null);

  // Function to fetch current logged-in user data
  const fetchUser = async () => {
    try {
      // API call to get current user details
      const response = await api.get("users/current-user");

      // Store user data in state
      setCurrentUser(response.data.data);

    } catch (error) {
      // Log error if user data not fetched
      console.log("User not fetched", error);
    }
  };

  // Function to fetch channel profile using username
  const fetchChannelProfile = async () => {
    try {
      // API call to fetch channel profile
      const response = await api.get(`/users/c/${username}`);

      // Store success message
      setMessage(response.data.message);

      // Store channel profile data
      setData(response.data.data);

    } catch (error) {
      // Store error message if API fails
      setMessage(error.response?.data?.message || "Failed to fetch channel");
    }
  };

  // useEffect runs once when component loads
  useEffect(() => {
    fetchChannelProfile(); // fetch channel data
    fetchUser(); // fetch current logged-in user data
  }, []);

  return (
    <div className="w-full bg-black min-h-screen text-white">

      {/* Display error message if channel data not available */}
      {message && !data && (
        <p className="text-center text-red-500 py-4">{message}</p>
      )}

      {/* Display channel profile if data is available */}
      {data ? (
        <div>

          {/* Cover Image Section */}
          <div className="w-full h-48 md:h-60 bg-gray-800 overflow-hidden">
            <img
              src={data.coverImage} // cover image URL
              alt="cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Avatar and Channel Info Section */}
          <div className="flex items-center px-6 -mt-12">

            {/* Channel Avatar */}
            <img
              src={data.avatar}
              alt="avatar"
              className="w-24 h-24 rounded-full border-4 border-black"
            />

            {/* Channel Details */}
            <div className="ml-4">

              {/* Full Name */}
              <h1 className="text-2xl font-bold">{data.fullName}</h1>

              {/* Username */}
              <h3 className="text-gray-400">@{data.username}</h3>

              {/* Email */}
              <p className="text-gray-400 text-sm">{data.email}</p>

              {/* Subscriber and Subscription Count */}
              <div className="flex space-x-4 text-sm text-gray-300 mt-2">
                <span>{data.subscribersCount} subscribers</span>
                <span>{data.channelsSubscribedToCount} subscribed</span>
              </div>

            </div>
          </div>

          {/* Navigation Tabs Section */}
          <div className="mt-6 border-b border-gray-700 px-6">
            <ul className="flex space-x-6 text-gray-400 text-sm">

              {/* Basic Tabs */}
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Videos</li>
              <li className="hover:text-white cursor-pointer">Playlists</li>

              {/* Show these options only if current user owns this channel */}
              {currentUser && currentUser._id === data._id && (
                <>

                  {/* Link to Channel Videos Management */}
                  <Link
                    to={`/channel/videos/${data._id}`}
                    className="hover:text-white cursor-pointer"
                  >
                    Channel Videos
                  </Link>

                  {/* Link to Channel Stats */}
                  <Link
                    to={`/channel/stats/${data._id}`}
                    className="hover:text-white cursor-pointer"
                  >
                    Channel Stats
                  </Link>

                </>
              )}

            </ul>
          </div>

        </div>
      ) : (

        // Loading message while fetching data
        <h1 className="text-center py-10 text-gray-400">
          Loading Channel Details...
        </h1>

      )}
    </div>
  );
};

export default ChannelProfile;


// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import api from "../../Api/api";

// const ChannelProfile = () => {
//   const [message, setMessage] = useState("");
//   const [data, setData] = useState(null);
//   const { username } = useParams();

//   const [currentUser, setCurrentUser] = useState(null);

//   const fetchUser = async () => {
//     try {
//       const response = await api.get("users/current-user");
//       console.log(response.data.data);
//       setCurrentUser(response.data.data);
//     } catch (error) {
//       console.log("User not fetched", error);
//     }
//   };

//   const fetchChannelProfile = async () => {
//     try {
//       const response = await api.get(`/users/c/${username}`);
//       setMessage(response.data.message);
//       setData(response.data.data);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to fetch channel");
//     }
//   };

//   useEffect(() => {
//     fetchChannelProfile();
//     fetchUser();
//   }, []);

//   return (
//     <div className="w-full bg-black min-h-screen text-white">
//       {/* Error Message */}
//       {message && !data && (
//         <p className="text-center text-red-500 py-4">{message}</p>
//       )}

//       {data ? (
//         <div>
//           {/* Cover Image */}
//           <div className="w-full h-48 md:h-60 bg-gray-800 overflow-hidden">
//             <img
//               src={data.coverImage}
//               alt="cover"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Avatar + Info */}
//           <div className="flex items-center px-6 -mt-12">
//             <img
//               src={data.avatar}
//               alt="avatar"
//               className="w-24 h-24 rounded-full border-4 border-black"
//             />
//             <div className="ml-4">
//               <h1 className="text-2xl font-bold">{data.fullName}</h1>
//               <h3 className="text-gray-400">@{data.username}</h3>
//               <p className="text-gray-400 text-sm">{data.email}</p>
//               <div className="flex space-x-4 text-sm text-gray-300 mt-2">
//                 <span>{data.subscribersCount} subscribers</span>
//                 <span>{data.channelsSubscribedToCount} subscribed</span>
//               </div>
//             </div>
//           </div>

//           {/* Tabs */}
//           <div className="mt-6 border-b border-gray-700 px-6">
//             <ul className="flex space-x-6 text-gray-400 text-sm">
//               <li className="hover:text-white cursor-pointer">Home</li>
//               <li className="hover:text-white cursor-pointer">Videos</li>
//               <li className="hover:text-white cursor-pointer">Playlists</li>
//               {currentUser._id === data._id && (
//                 <>
//                   <Link
//                     to={`/channel/videos/${data._id}`}
//                     className="hover:text-white cursor-pointer"
//                   >
//                     Channel Videos
//                   </Link>
//                   <Link
//                     to={`/channel/stats/${data._id}`}
//                     className="hover:text-white cursor-pointer"
//                   >
//                     Channel Stats
//                   </Link>
//                 </>
//               )}
//             </ul>
//           </div>
//         </div>
//       ) : (
//         <h1 className="text-center py-10 text-gray-400">
//           Loading Channel Details...
//         </h1>
//       )}
//     </div>
//   );

// }

// export default ChannelProfile;
