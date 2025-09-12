// import React, { useEffect, useState } from 'react';
// import axios from "axios";

// const Home = () => {
//   const url = "http://localhost:8000/api/v1/videos";
//   const [videos, setVideos] = useState([]);

//   const allVideos = async () => {
//     try {
//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       });

//       // Access videos array properly
//       setVideos(response.data.data.videos);
//       console.log(response.data.data.videos); // for debugging
//     } catch (error) {
//       console.log(error.response?.data?.message || error.message, "while fetching all videos");
//     }
//   };

//   useEffect(() => {
//     allVideos();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <h1 className="text-2xl font-bold mb-4">All Videos</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {videos.length > 0 ? (
//           videos.map((video) => (
//             <div key={video._id} className="bg-white p-4 rounded-lg shadow">
//               <img
//                 src={video.thumbnail}
//                 alt={video.title}
//                 className="w-full h-40 object-cover rounded"
//               />
//               <h2 className="mt-2 font-semibold text-gray-700">{video.title}</h2>
//               <p className="text-sm text-gray-500">{video.description}</p>
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
import api from '../Api/api'; // if you want to use your api helper

const Home = () => {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const response = await api.get("/videos"); // automatically includes token from api helper
      setVideos(response.data.data.videos);
      console.log(response.data.data.videos);
    } catch (error) {
      console.log(error.response?.data?.message || error.message, "while fetching videos");
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">All Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div key={video._id} className="bg-white shadow rounded-lg overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{video.title}</h2>
                <p className="text-sm text-gray-500">{video.description}</p>
                <div className="flex items-center mt-2">
                  <img
                    src={video.owner.avatar}
                    alt={video.owner.username}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-sm font-medium">{video.owner.fullName}</span>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-400">
                  <span>Views: {video.views}</span>
                  <span>Duration: {video.duration}s</span>
                  {/* <span>{video.isPublished ? "Published" : "Draft"}</span> */}
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
