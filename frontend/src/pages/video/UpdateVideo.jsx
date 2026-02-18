import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Api/api";

const UpdateVideo = () => {

  // Get video ID from URL parameters
  const { id } = useParams();

  // State to store video title and description
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  // State to store selected thumbnail file
  const [thumbnail, setThumbnail] = useState(null);

  // State to store success or error messages
  const [message, setMessage] = useState("");

  // Hook for programmatic navigation
  const navigate = useNavigate();


  // Handle input changes for title and description
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value, // Dynamically update field
    });
  };


  // Handle file selection (thumbnail upload)
  const handleFileChange = (e) => {
    if (e.target.name === "thumbnail") {
      setThumbnail(e.target.files[0]); // Store selected file
    }
  };


  // Navigate to delete confirmation page
  const handleDeleteClick = async () => {
    navigate(`/videos/delete/${id}`);
  };


  // Navigate to publish/private status page
  const handlePriveteClick = () => {
    navigate(`/videos/status/${id}`);
  };


  // Fetch existing video data to pre-fill form
  const fetchSingleVideo = async () => {
    try {
      const response = await api.get(`/videos/${id}`);

      // Set title and description in form
      setData(response.data.data);

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to fetch video"
      );
    }
  };


  // Handle form submission to update video
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Create FormData object for multipart/form-data
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    // Only append thumbnail if user selected a new one
    if (thumbnail) formData.append("thumbnail", thumbnail);

    try {
      // Send PATCH request to update video
      const res = await api.patch(`/videos/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Show success message
      setMessage(res.data.message || "Video updated successfully!");

      // Redirect to single video page
      navigate(`/videos/${id}`);

    } catch (error) {
      // Show error message
      setMessage(
        error.response?.data?.message || "Failed to update video"
      );
    }
  };


  // Run once when component mounts to fetch existing data
  useEffect(() => {
    fetchSingleVideo();
  }, []);


  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">

      {/* Main Card */}
      <div className="bg-[#181818] text-white w-full max-w-2xl rounded-lg shadow-lg p-6">

        {/* Page Title */}
        <h2 className="text-2xl font-bold mb-4 text-white">
          Update Video Details
        </h2>


        {/* Success or Error Message */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-md text-sm ${
              message.toLowerCase().includes("fail") ||
              message.toLowerCase().includes("error")
                ? "bg-red-600 text-white"
                : "bg-green-600 text-white"
            }`}
          >
            {message}
          </div>
        )}


        {/* Update Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title Input */}
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md bg-[#121212] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter video title"
              required
            />
          </div>


          {/* Description Input */}
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleInputChange}
              className="w-full p-2 rounded-md bg-[#121212] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Enter video description"
              rows="4"
              required
            ></textarea>
          </div>


          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm mb-1">Thumbnail</label>
            <input
              type="file"
              name="thumbnail"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
              file:rounded-full file:border-0 
              file:text-sm file:font-semibold
              file:bg-red-600 file:text-white
              hover:file:bg-red-700"
            />
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-semibold transition"
          >
            Update Video
          </button>

        </form>

        <br />

        {/* Delete Video Button */}
        <button
          onClick={handleDeleteClick}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-semibold transition"
        >
          Delete Video
        </button>

        <br />
        <br />

        {/* Change Publish Status Button */}
        <button
          onClick={handlePriveteClick}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-semibold transition"
        >
          Change Status of Video
        </button>

      </div>
    </div>
  );
};

export default UpdateVideo;



// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../../Api/api";

// const UpdateVideo = () => {
//   const { id } = useParams();
//   const [data, setData] = useState({
//     title: "",
//     description: "",
//   });
//   const [thumbnail, setThumbnail] = useState(null);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setData({
//       ...data,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFileChange = (e) => {
//     if (e.target.name === "thumbnail") {
//       setThumbnail(e.target.files[0]);
//     }
//   };

//   const handleDeleteClick = async () => {
//     navigate(`/videos/delete/${id}`);
//   };

//   const handlePriveteClick = () => {
//     navigate(`/videos/status/${id}`);
//   };

//   const fetchSingleVideo = async () => {
//     try {
//       const response = await api.get(`/videos/${id}`);
//       setData(response.data.data);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to fetch video");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", data.title);
//     formData.append("description", data.description);
//     if (thumbnail) formData.append("thumbnail", thumbnail);

//     try {
//       const res = await api.patch(`/videos/${id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setMessage(res.data.message || "Video updated successfully!");
//       navigate(`/videos/${id}`);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Failed to update video");
//     }
//   };

//   useEffect(() => {
//     fetchSingleVideo();
//   }, []);

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center p-6">
//       <div className="bg-[#181818] text-white w-full max-w-2xl rounded-lg shadow-lg p-6">
//         <h2 className="text-2xl font-bold mb-4 text-white">
//           Update Video Details
//         </h2>

//         {/* Message */}
//         {message && (
//           <div
//             className={`mb-4 p-3 rounded-md text-sm ${
//               message.toLowerCase().includes("fail") ||
//               message.toLowerCase().includes("error")
//                 ? "bg-red-600 text-white"
//                 : "bg-green-600 text-white"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Title */}
//           <div>
//             <label className="block text-sm mb-1">Title</label>
//             <input
//               type="text"
//               name="title"
//               value={data.title}
//               onChange={handleInputChange}
//               className="w-full p-2 rounded-md bg-[#121212] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
//               placeholder="Enter video title"
//               required
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm mb-1">Description</label>
//             <textarea
//               name="description"
//               value={data.description}
//               onChange={handleInputChange}
//               className="w-full p-2 rounded-md bg-[#121212] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
//               placeholder="Enter video description"
//               rows="4"
//               required
//             ></textarea>
//           </div>

//           {/* Thumbnail */}
//           <div>
//             <label className="block text-sm mb-1">Thumbnail</label>
//             <input
//               type="file"
//               name="thumbnail"
//               onChange={handleFileChange}
//               className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
//               file:rounded-full file:border-0 
//               file:text-sm file:font-semibold
//               file:bg-red-600 file:text-white
//               hover:file:bg-red-700"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-semibold transition"
//           >
//             Update Video
//           </button>
//         </form>
//         <br></br>
//         <button
//           onClick={handleDeleteClick}
//           className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-semibold transition"
//         >
//           Delete Video
//         </button>
//         <br></br>
//         <br></br>
//         <button
//           onClick={handlePriveteClick}
//           className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-semibold transition"
//         >
//           Change Status of Video
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UpdateVideo;
