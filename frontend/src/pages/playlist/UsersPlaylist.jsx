import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { useNavigate, useParams } from "react-router-dom";

const UsersPlaylist = () => {
  // Get user ID from route parameters
  const { id } = useParams();

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // State to store playlists of the user
  const [playlistData, setPlaylistData] = useState([]);

  // Function to fetch playlists of a specific user
  const userPlaylist = async () => {
    try {
      // API call to get all playlists created by the user
      const response = await api.get(`/playlist/user/${id}`);

      // Store fetched playlists in state
      setPlaylistData(response.data.data);
    } catch (error) {
      // Handle error gracefully
      console.log(error.response?.data || error);
    }
  };

  // Fetch playlists when component mounts
  useEffect(() => {
    userPlaylist();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          User’s Playlists
        </h1>

        {/* Conditional Rendering: If playlists exist */}
        {playlistData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlistData.map((playlist) => (
              <div
                key={playlist._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden"
                
                // Navigate to individual playlist page on card click
                onClick={() => navigate(`/playlist/${playlist._id}`)}
              >
                {/* Playlist Thumbnail Section 
                    (Shows total video count, acts as placeholder if no image exists) */}
                <div className="relative w-full h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">
                    📂 {playlist.videos?.length || 0} videos
                  </span>
                </div>

                {/* Playlist Details Section */}
                <div className="p-4">
                  {/* Playlist Name */}
                  <h2 className="text-lg font-semibold truncate hover:text-red-500">
                    {playlist.name}
                  </h2>

                  {/* Playlist Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                    {playlist.description}
                  </p>

                  {/* Playlist Creation Date */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Created on{" "}
                    {new Date(playlist.createdAt).toLocaleDateString()}
                  </p>

                  {/* Button to explicitly navigate to playlist videos */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent parent card click event
                      navigate(`/playlist/${playlist._id}`);
                    }}
                    className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition"
                  >
                    See Videos
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Message displayed if no playlists are found
          <h1 className="text-lg text-center text-gray-600 dark:text-gray-400">
            No playlists found...
          </h1>
        )}
      </div>
    </div>
  );
};

export default UsersPlaylist;


// import React, { useEffect, useState } from "react";
// import api from "../../Api/api";
// import { useNavigate, useParams } from "react-router-dom";

// const UsersPlaylist = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [playlistData, setPlaylistData] = useState([]);

//   const userPlaylist = async () => {
//     try {
//       const response = await api.get(`/playlist/user/${id}`);
//       setPlaylistData(response.data.data);
//     } catch (error) {
//       console.log(error.response?.data || error);
//     }
//   };

//   useEffect(() => {
//     userPlaylist();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-2xl md:text-3xl font-bold mb-6">
//           User’s Playlists
//         </h1>

//         {playlistData.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {playlistData.map((playlist) => (
//               <div
//                 key={playlist._id}
//                 className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden"
//                 onClick={() => navigate(`/playlist/${playlist._id}`)}
//               >
//                 {/* Playlist Thumbnail (fallback color block if no image) */}
//                 <div className="relative w-full h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
//                   <span className="text-gray-400 text-sm">
//                     📂 {playlist.videos?.length || 0} videos
//                   </span>
//                 </div>

//                 {/* Playlist Info */}
//                 <div className="p-4">
//                   <h2 className="text-lg font-semibold truncate hover:text-red-500">
//                     {playlist.name}
//                   </h2>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
//                     {playlist.description}
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
//                     Created on{" "}
//                     {new Date(playlist.createdAt).toLocaleDateString()}
//                   </p>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       navigate(`/playlist/${playlist._id}`);
//                     }}
//                     className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition"
//                   >
//                     See Videos
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <h1 className="text-lg text-center text-gray-600 dark:text-gray-400">
//             No playlists found...
//           </h1>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UsersPlaylist;
