import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { Link, useNavigate, useParams } from "react-router-dom";

const CreatePlaylist = () => {

  // State to store feedback message
  const [message, setMessage] = useState("");

  // State to track message type: "success" or "error"
  const [status, setStatus] = useState("");

  // Get playlist ID from URL params
  const { id } = useParams();

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // State to store playlist form data
  const [playList, setPlayList] = useState({
    name: "",
    description: "",
  });

  // Handle input field changes (controlled components)
  const handleInputChange = (e) => {
    setPlayList({
      ...playList,               // keep existing values
      [e.target.name]: e.target.value, // update specific field
    });
  };

  // Fetch existing playlist data by ID (for editing)
  const playListById = async () => {
    try {
      const response = await api.get(`/playlist/${id}`);

      // Populate form with existing playlist data
      setPlayList(response.data.data);

    } catch (error) {
      // Safely log error
      console.log(error.response?.data || error.message);
    }
  };

  // Handle form submission (Update playlist)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Reset message state
    setMessage("");
    setStatus("");

    try {
      // Send PATCH request to update playlist
      const response = await api.patch(`/playlist/${id}`, playList, {
        headers: { "Content-Type": "application/json" },
      });

      // Show success message
      setMessage(response.data.message || "Playlist updated successfully!");
      setStatus("success");

      // Reset form fields
      setPlayList({ name: "", description: "" });

      // Navigate back after update
      navigate(-1);

    } catch (error) {
      // Show error message
      setMessage(
        error.response?.data?.message ||
        "Something went wrong. Please try again"
      );
      setStatus("error");
    }
  };

  // Fetch playlist data when component mounts
  useEffect(() => {
    playListById();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">

      {/* Page Title */}
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Update Playlist
      </h2>

      {/* Feedback Message Section */}
      {message && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm font-medium ${
            status === "success"
              ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
              : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
          }`}
        >
          {message}
        </div>
      )}

      {/* Update Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Playlist Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Playlist Name
          </label>
          <input
            type="text"
            name="name"
            value={playList.name}
            onChange={handleInputChange}
            placeholder="Enter playlist name"
            className="mt-1 block w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        {/* Playlist Description Field */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <textarea
            name="description"
            value={playList.description}
            onChange={handleInputChange}
            placeholder="Enter playlist description"
            rows="3"
            className="mt-1 block w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Update Playlist
        </button>

        {/* Delete Playlist Link */}
        <Link to={`/playlist/delete/${playList._id}`}>
          <button
            type="button"
            className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition mt-2"
          >
            Delete Playlist
          </button>
        </Link>

      </form>
    </div>
  );
};

export default CreatePlaylist;


// import React, { useEffect, useState } from "react";
// import api from "../../Api/api";
// import { Link, useNavigate, useParams } from "react-router-dom";

// const CreatePlaylist = () => {
//   const [message, setMessage] = useState("");
//   const [status, setStatus] = useState(""); // success | error

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [playList, setPlayList] = useState({
//     name: "",
//     description: "",
//   });

//   const handleInputChange = (e) => {
//     setPlayList({
//       ...playList,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const playListById = async () => {
//     try {
//       const response = await api.get(`/playlist/${id}`);
//       setPlayList(response.data.data);
//     } catch (error) {
//       console.log(error.response);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setStatus("");

//     try {
//       const response = await api.patch(`/playlist/${id}`, playList, {
//         headers: { "Content-Type": "application/json" },
//       });

//       setMessage(response.data.message || "Playlist created successfully!");
//       setStatus("success");

//       // reset inputs
//       setPlayList({ name: "", description: "" });
//       navigate(-1);
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message ||
//           "Something went wrong. Please try again"
//       );
//       setStatus("error");
//     }
//   };

//   useEffect(() => {
//     playListById();
//   }, []);

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
//       <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
//         Update Playlist
//       </h2>

//       {/* Feedback Message */}
//       {message && (
//         <div
//           className={`mb-4 p-3 rounded-lg text-sm font-medium ${
//             status === "success"
//               ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
//               : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label
//             htmlFor="name"
//             className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//           >
//             Playlist Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={playList.name}
//             onChange={handleInputChange}
//             placeholder="Enter playlist name"
//             className="mt-1 block w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//           >
//             Description
//           </label>
//           <textarea
//             name="description"
//             value={playList.description}
//             onChange={handleInputChange}
//             placeholder="Enter playlist description"
//             rows="3"
//             className="mt-1 block w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
//         >
//           Update Playlist
//         </button>
//         <Link to={`/playlist/delete/${playList._id}`}>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
//           >
//             Delete Playlist
//           </button>
//         </Link>
//       </form>
//     </div>
//   );
// };

// export default CreatePlaylist;
