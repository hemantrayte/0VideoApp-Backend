import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../Api/api";
import AllComemnts from "../comments/AllComemnts";
import AddCommentVideo from "../comments/AddCommentVideo";

const SingleVideo = () => {

  // Get video ID from URL parameters
  const { id } = useParams();

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // State to store video data
  const [video, setVideo] = useState(null);

  // State to store current logged-in user
  const [currentUser, setCurrentUser] = useState(null);

  // State to store likes count
  const [likes, setLikes] = useState(0);

  // State to store comments list
  const [comments, setComments] = useState([]);

  // State to refresh comments when new comment added
  const [refreshComments, setRefreshComments] = useState(false);


  // Function to fetch single video details from backend
  const fetchSingleVideo = async () => {
    try {
      const response = await api.get(`/videos/${id}`);

      // Store video data in state
      setVideo(response.data.data);

      // Store likes count (default 0 if undefined)
      setLikes(response.data.data.likesCount || 0);

      // Store comments (if available)
      setComments(response.data.data.comments || []);

    } catch (error) {
      console.log(error.response.data || error.message);
    }
  };


  // Function to fetch current logged-in user
  const fetchCurrentUser = async () => {
    try {
      const res = await api.get("/users/current-user");

      // Store current user info
      setCurrentUser(res.data);

      console.log(res.data);

    } catch (error) {
      console.log("Could not fetch current user", error);
    }
  };


  // Function to like or unlike video
  const handleLike = async () => {
    try {
      const response = await api.post(`/likes/toggle/v/${id}`);

      // Increase likes count in UI (instant update)
      setLikes((prev) => prev + 1);

      console.log(response.data);

    } catch (error) {
      console.log("Error liking video", error.response);
    }
  };


  // useEffect runs when component loads or id changes
  // Fetch video details and current user
  useEffect(() => {
    fetchSingleVideo();
    fetchCurrentUser();
  }, [id]);


  // Show loading message while video is loading
  if (!video) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
          Loading video...
        </h1>
      </div>
    );
  }


  // Check if current user is owner of video
  const isOwner = currentUser?._id === video.owner._id;


  return (
    <div className="flex flex-col lg:flex-row max-w-6xl mx-auto p-4 space-y-6 lg:space-y-0 lg:space-x-6">

      {/* LEFT SECTION: Video Player and Video Information */}
      <div className="flex-1">

        {/* Video Player */}
        <video
          src={video.videoFile}
          controls
          poster={video.thumbnail}
          className="w-full rounded-xl shadow-lg"
        ></video>


        {/* Video Title */}
        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
          {video.title}
        </h1>


        {/* Video Views and Upload Date */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {video.views} views • {new Date(video.createdAt).toDateString()}
        </p>


        {/* Channel Information */}
        <div className="flex items-center justify-between mt-4 pb-4 border-b border-gray-200 dark:border-gray-700">

          {/* Channel avatar and info */}
          <div className="flex items-center space-x-3">
            <img
              src={video.owner.avatar}
              alt={video.owner.username}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {video.owner.username}
              </h4>
              <p className="text-sm text-gray-500">
                {video.owner.fullName}
              </p>
            </div>
          </div>


          {/* Show Update button if owner, else Subscribe button */}
          <div className="flex items-center space-x-3">
            {isOwner ? (
              <button
                onClick={() => navigate(`/videos/update/${video._id}`)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-yellow-600 transition"
              >
                Update
              </button>
            ) : (
              <button className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition">
                Subscribe
              </button>
            )}
          </div>

        </div>


        {/* Like Button Section */}
        <div className="flex items-center space-x-3 mt-4">

          {/* Like button with likes count */}
          <button
            onClick={handleLike}
            className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            👍 Like {likes > 0 && <span>({likes})</span>}
          </button>

        </div>


        {/* Video Description */}
        <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-800 dark:text-gray-200">
            {video.description}
          </p>
        </div>


        {/* COMMENTS SECTION */}
        <div className="mt-6">

          {/* Comments heading */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Comments
          </h3>


          {/* Component to add new comment */}
          <AddCommentVideo
            id={video._id}

            // Trigger refresh when new comment added
            onCommentAdded={() =>
              setRefreshComments((prev) => !prev)
            }
          />


          {/* Component to display all comments */}
          <div className="space-y-3">
            <AllComemnts
              id={video._id}
              refresh={refreshComments}
            />
          </div>

        </div>

      </div>



      {/* RIGHT SECTION: Suggested Videos */}
      <div className="w-full lg:w-80">

        {/* Suggested videos heading */}
        <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
          Suggested Videos
        </h2>


        {/* Suggested video item */}
        <div className="space-y-4">
          <div className="flex space-x-3">

            {/* Thumbnail */}
            <img
              src={video.thumbnail}
              alt="suggested"
              className="w-32 h-20 rounded-lg object-cover"
            />

            {/* Suggested video info */}
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Sample Video
              </p>
              <p className="text-sm text-gray-500">
                Channel Name
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default SingleVideo;



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../../Api/api";
// import AllComemnts from "../comments/AllComemnts";
// import AddCommentVideo from "../comments/AddCommentVideo";

// const SingleVideo = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [video, setVideo] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [likes, setLikes] = useState(0);
//   const [comments, setComments] = useState([]);
//   const [refreshComments, setRefreshComments] = useState(false);

//   const fetchSingleVideo = async () => {
//     try {
//       const response = await api.get(`/videos/${id}`);
//       setVideo(response.data.data);
//       setLikes(response.data.data.likesCount || 0);
//       setComments(response.data.data.comments || []);
//     } catch (error) {
//       console.log(error.response.data || error.message);
//     }
//   };

//   const fetchCurrentUser = async () => {
//     try {
//       const res = await api.get("/users/current-user");
//       setCurrentUser(res.data);
//       console.log(res.data);
//     } catch (error) {
//       console.log("Could not fetch current user", error);
//     }
//   };

//   const handleLike = async () => {
//     try {
//       const response = await api.post(`/likes/toggle/v/${id}`);
//       setLikes((prev) => prev + 1);
//       console.log(response.data);
//     } catch (error) {
//       console.log("Error liking video", error.response);
//     }
//   };

//   useEffect(() => {
//     fetchSingleVideo();
//     fetchCurrentUser();
//   }, [id]);

//   if (!video) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <h1 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
//           Loading video...
//         </h1>
//       </div>
//     );
//   }

//   const isOwner = currentUser?._id === video.owner._id;

//   return (
//     <div className="flex flex-col lg:flex-row max-w-6xl mx-auto p-4 space-y-6 lg:space-y-0 lg:space-x-6">
//       {/* Left: Video Player + Info */}
//       <div className="flex-1">
//         {/* Video Player */}
//         <video
//           src={video.videoFile}
//           controls
//           poster={video.thumbnail}
//           className="w-full rounded-xl shadow-lg"
//         ></video>

//         {/* Title */}
//         <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
//           {video.title}
//         </h1>

//         {/* Views + Date */}
//         <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//           {video.views} views • {new Date(video.createdAt).toDateString()}
//         </p>

//         {/* Channel Info */}
//         <div className="flex items-center justify-between mt-4 pb-4 border-b border-gray-200 dark:border-gray-700">
//           <div className="flex items-center space-x-3">
//             <img
//               src={video.owner.avatar}
//               alt={video.owner.username}
//               className="w-12 h-12 rounded-full"
//             />
//             <div>
//               <h4 className="font-semibold text-gray-900 dark:text-white">
//                 {video.owner.username}
//               </h4>
//               <p className="text-sm text-gray-500">{video.owner.fullName}</p>
//             </div>
//           </div>

//           <div className="flex items-center space-x-3">
//             {isOwner ? (
//               <button
//                 onClick={() => navigate(`/videos/update/${video._id}`)}
//                 className="bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-yellow-600 transition"
//               >
//                 Update
//               </button>
//             ) : (
//               <button className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition">
//                 Subscribe
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Like Button */}
//         <div className="flex items-center space-x-3 mt-4">
//           <button
//             onClick={handleLike}
//             className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
//           >
//             👍 Like {likes > 0 && <span>({likes})</span>}
//           </button>
//         </div>

//         {/* Description */}
//         <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
//           <p className="text-gray-800 dark:text-gray-200">
//             {video.description}
//           </p>
//         </div>

//         {/* Comments Section */}
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
//             Comments
//           </h3>

//           {/* add comments */}
//           <AddCommentVideo
//             id={video._id}
//             onCommentAdded={() => setRefreshComments((prev) => !prev)}
//           />

//           {/* Comment List */}
//           <div className="space-y-3">
//             <AllComemnts id={video._id} refresh={refreshComments} />
//           </div>
//         </div>
//       </div>

//       {/* Right: Suggested videos */}
//       <div className="w-full lg:w-80">
//         <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
//           Suggested Videos
//         </h2>
//         <div className="space-y-4">
//           <div className="flex space-x-3">
//             <img
//               src={video.thumbnail}
//               alt="suggested"
//               className="w-32 h-20 rounded-lg object-cover"
//             />
//             <div>
//               <p className="font-medium text-gray-900 dark:text-white">
//                 Sample Video
//               </p>
//               <p className="text-sm text-gray-500">Channel Name</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleVideo;
