import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { useParams } from "react-router-dom";

const ChannelVideos = () => {
  // State to store all videos of a channel
  const [channelVideo, setChannelVideo] = useState([]);

  // State to store error message
  const [message, setMessage] = useState("");

  // Get channel/user id from URL
  const { id } = useParams();

  // Fetch all videos uploaded by the channel
  const channelVideos = async () => {
    try {
      const response = await api.get(`/dashboard/videos/${id}`);

      // Save videos list into state
      setChannelVideo(response.data.data.videos);
    } catch (error) {
      console.log(error.response);

      // Handle API error
      setMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again"
      );
    }
  };

  // Call channelVideos() when component mounts
  useEffect(() => {
    channelVideos();
  }, [id]); // re-fetch if channel id changes

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Show error message */}
      {message && (
        <p className="text-red-500 font-medium mb-4">{message}</p>
      )}

      {/* Check if channel has videos */}
      {channelVideo.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {channelVideo.map((video) => (
            <div
              key={video._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden"
            >
              {/* Video Player */}
              <video
                src={video.videoUrl} // backend video URL
                controls
                className="w-full h-48 object-cover"
              />

              {/* Video Details */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {video.title}
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(video.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // No videos found
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No Channel Videos
        </p>
      )}
    </div>
  );
};

export default ChannelVideos;


// import React, { useEffect, useState } from "react";
// import api from "../../Api/api";
// import { useParams } from "react-router-dom";

// const ChannelVideos = () => {
//   const [channelVideo, setChannelVideo] = useState([]);
//   const [message, setMessage] = useState("");

//   const { id } = useParams();

//   const channelVideos = async () => {
//     try {
//       const response = await api.get(`/dashboard/videos/${id}`);
//       console.log(response.data.data.videos);
//       setChannelVideo(response.data.data.videos);
//     } catch (error) {
//       console.log(error.response);
//       setMessage(
//         error.response?.data?.message ||
//           "Something went wrong. Please try again"
//       );
//     }
//   };

//   useEffect(() => {
//     channelVideos();
//   }, []);

//   return (
//     <div>
//       {channelVideo.length > 0 ? (
//         <div>
//           {channelVideo.map((video) => (
//             <div key={video._id}>
//               <video src=""></video>
//             </div>
//           ))}
//         </div>
//       ) : (
//         "No Channel Videos "
//       )}
//     </div>
//   );
// };

// export default ChannelVideos;
