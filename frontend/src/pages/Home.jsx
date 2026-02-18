import React, { useEffect, useState } from "react";
import api from "../Api/api";
import { Link } from "react-router-dom";

// Home Component
// This component displays all videos fetched from the backend
const Home = () => {

  // State to store list of videos
  const [videos, setVideos] = useState([]);

  // State to store currently playing video ID
  // Used to toggle between thumbnail and video player
  const [playingVideo, setPlayingVideo] = useState(null);

  // Function to fetch videos from backend API
  const fetchVideos = async () => {
    try {
      const response = await api.get("/videos"); // API call to get videos
      setVideos(response.data.data.videos); // Store videos in state
    } catch (error) {
      // Handle error if API fails
      console.log(error.response?.data?.message || error.message);
    }
  };

  // useEffect runs when component loads for the first time
  // Calls fetchVideos function to load videos
  useEffect(() => {
    fetchVideos();
  }, []);

  return (

    // Main container
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Page heading */}
      <h1 className="text-3xl font-bold mb-6">All Videos</h1>

      {/* Video grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {/* Check if videos exist */}
        {videos.length > 0 ? (

          // Loop through videos and display each video
          videos.map((video) => (

            <div
              key={video._id} // Unique key for React rendering
              className="bg-white shadow rounded-lg overflow-hidden relative"
            >

              {/* If current video is playing, show video player */}
              {playingVideo === video._id ? (

                <video
                  src={video.videoFile} // Video file URL
                  controls
                  autoPlay
                  className="w-full h-48 object-cover bg-black"

                  // Reset to thumbnail when video ends
                  onEnded={() => setPlayingVideo(null)}
                />

              ) : (

                // Show thumbnail when video is not playing
                <div
                  className="relative cursor-pointer"

                  // When clicked, set this video as playing
                  onClick={() => setPlayingVideo(video._id)}
                >

                  {/* Video thumbnail */}
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white bg-opacity-75 rounded-full p-3">

                      {/* Play icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-red-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>

                    </div>
                  </div>

                </div>

              )}

              {/* Video details section */}
              <div className="p-4">

                {/* Video title */}
                <h2 className="text-lg font-semibold">
                  {video.title}
                </h2>

                {/* Video description */}
                <p className="text-sm text-gray-500">
                  {video.description}
                </p>

                {/* Video owner info */}
                <div className="flex items-center mt-2">

                  {/* Owner avatar */}
                  <img
                    src={video.owner.avatar}
                    alt={video.owner.username}
                    className="w-8 h-8 rounded-full mr-2"
                  />

                  {/* Owner full name */}
                  <span className="text-sm font-medium">
                    {video.owner.fullName}
                  </span>

                </div>

                {/* Video stats */}
                <div className="flex justify-between mt-2 text-sm text-gray-400">

                  {/* Total views */}
                  <span>
                    Views: {video.views}
                  </span>

                  {/* Video duration */}
                  <span>
                    Duration: {video.duration}s
                  </span>

                  {/* Publish status */}
                  <span>
                    {video.isPublished ? "Published" : "Draft"}
                  </span>

                </div>

              </div>

            </div>

          ))

        ) : (

          // Show message if no videos available
          <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">

            <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
              No videos available. Please login
            </p>

            {/* Login button */}
            <Link
              to="/login"
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition duration-200"
            >
              Login
            </Link>

          </div>

        )}

      </div>

    </div>

  );
};

export default Home; // Export component


// import React, { useEffect, useState } from "react";
// import api from "../Api/api";
// import { Link } from "react-router-dom";

// const Home = () => {
//   const [videos, setVideos] = useState([]);
//   const [playingVideo, setPlayingVideo] = useState(null); // store currently playing video ID

//   const fetchVideos = async () => {
//     try {
//       const response = await api.get("/videos");
//       setVideos(response.data.data.videos);
//     } catch (error) {
//       console.log(error.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     fetchVideos();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-6">All Videos</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {videos.length > 0 ? (
//           videos.map((video) => (
//             <div
//               key={video._id}
//               className="bg-white shadow rounded-lg overflow-hidden relative"
//             >
//               {playingVideo === video._id ? (
//                 // Video player
//                 <video
//                   src={video.videoFile}
//                   controls
//                   autoPlay
//                   className="w-full h-48 object-cover bg-black"
//                   onEnded={() => setPlayingVideo(null)} // reset thumbnail after video ends
//                 />
//               ) : (
//                 // Thumbnail with play button
//                 <div
//                   className="relative cursor-pointer"
//                   onClick={() => setPlayingVideo(video._id)}
//                 >
//                   <img
//                     src={video.thumbnail}
//                     alt={video.title}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="bg-white bg-opacity-75 rounded-full p-3">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-10 w-10 text-red-600"
//                         fill="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path d="M8 5v14l11-7z" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="p-4">
//                 <h2 className="text-lg font-semibold">{video.title}</h2>
//                 <p className="text-sm text-gray-500">{video.description}</p>
//                 <div className="flex items-center mt-2">
//                   <img
//                     src={video.owner.avatar}
//                     alt={video.owner.username}
//                     className="w-8 h-8 rounded-full mr-2"
//                   />
//                   <span className="text-sm font-medium">
//                     {video.owner.fullName}
//                   </span>
//                 </div>
//                 <div className="flex justify-between mt-2 text-sm text-gray-400">
//                   <span>Views: {video.views}</span>
//                   <span>Duration: {video.duration}s</span>
//                   <span>{video.isPublished ? "Published" : "Draft"}</span>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
//             <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
//               No videos available. Please login
//             </p>
//             <Link
//               to="/login"
//               className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition duration-200"
//             >
//               Login
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
