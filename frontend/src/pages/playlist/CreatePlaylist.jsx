import React, { useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";

const CreatePlaylist = () => {

  // State to store feedback message (success or error)
  const [message, setMessage] = useState("");

  // State to track status type: "success" or "error"
  const [status, setStatus] = useState("");

  // State to store playlist form data
  const [playList, setPlayList] = useState({
    name: "",
    description: "",
  });

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handle input and textarea changes
  const handleInputChange = (e) => {
    setPlayList({
      ...playList,               // keep existing values
      [e.target.name]: e.target.value, // update specific field
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Reset previous message & status
    setMessage("");
    setStatus("");

    try {
      // Send POST request to backend with playlist data
      const response = await api.post("/playlist", playList, {
        headers: { "Content-Type": "application/json" },
      });

      // Show success message from backend or fallback message
      setMessage(response.data.message || "Playlist created successfully!");
      setStatus("success");

      // Reset form fields
      setPlayList({ name: "", description: "" });

      // Navigate back to previous page (playlist list)
      navigate(-1);

    } catch (error) {
      // Show backend error message if available, otherwise default message
      setMessage(
        error.response?.data?.message ||
        "Something went wrong. Please try again"
      );

      setStatus("error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">

      {/* Page Title */}
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Create New Playlist
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

      {/* Playlist Creation Form */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Create Playlist
        </button>

      </form>
    </div>
  );
};

export default CreatePlaylist;


// import React, { useState } from "react";
// import api from "../../Api/api";
// import { useNavigate } from "react-router-dom";

// const CreatePlaylist = () => {
//   const [message, setMessage] = useState("");
//   const [status, setStatus] = useState(""); // success | error

//   const [playList, setPlayList] = useState({
//     name: "",
//     description: "",
//   });

//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setPlayList({
//       ...playList,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setStatus("");

//     try {
//       const response = await api.post("/playlist", playList, {
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

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
//       <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
//         Create New Playlist
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
//           Create Playlist
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreatePlaylist;
