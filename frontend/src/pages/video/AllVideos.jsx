// import React, { useEffect, useState } from 'react';
// import api from '../../Api/api';
// import { Link, useNavigate } from "react-router-dom";

// const Home = () => {
//   const [videos, setVideos] = useState([]);
//   const [playingVideo, setPlayingVideo] = useState(null); // store currently playing video ID
//   const navigate = useNavigate();

//   const fetchVideos = async () => {
//     try {
//       const response = await api.get("/videos");
//       setVideos(response.data.data.videos);
//     } catch (error) {
//       console.log(error.response?.data?.message || error.message);
//     }
//   };

//   // const handleClick = async(e) => {
//   //   try {
//   //     navigate(`/videos/${e.target._id}`);
//   //   } catch (error) {
//   //     console.log(error.response?.data?.message || error.message);
//   //   }
//   // }

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
           
//              key={video._id} 
//              className="bg-white shadow rounded-lg overflow-hidden relative"
//              onClick={() => navigate(`/videos/${video._id}`)}
//              >
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
//                   <span className="text-sm font-medium">{video.owner.fullName}</span>
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
//           <p>No videos available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from 'react';
import api from '../../Api/api';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [playingVideo, setPlayingVideo] = useState(null);
  const navigate = useNavigate();

  const fetchVideos = async () => {
    try {
      const response = await api.get("/videos");
      setVideos(response.data.data.videos);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Recommended</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div
              key={video._id}
              className="cursor-pointer group"
              onClick={() => navigate(`/videos/${video._id}`)}
            >
              {/* Thumbnail / Video */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
                {playingVideo === video._id ? (
                  <video
                    src={video.videoFile}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                    onEnded={() => setPlayingVideo(null)}
                  />
                ) : (
                  <div onClick={(e) => {
                    e.stopPropagation();
                    setPlayingVideo(video._id);
                  }}>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <div className="bg-white bg-opacity-80 rounded-full p-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-red-600"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="flex mt-3">
                {/* Avatar */}
                <img
                  src={video.owner.avatar}
                  alt={video.owner.username}
                  className="w-9 h-9 rounded-full mr-3"
                />

                {/* Details */}
                <div>
                  <h2 className="text-sm font-semibold line-clamp-2">{video.title}</h2>
                  <p className="text-xs text-gray-400">{video.owner.fullName}</p>
                  <div className="flex text-xs text-gray-400 space-x-2">
                    <span>{video.views} views</span>
                    <span>• {video.duration}s</span>
                    <span>• {video.isPublished ? "Published" : "Draft"}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No videos available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
