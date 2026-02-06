
import React, { useState } from "react";
import api from "../../Api/api";
import { useNavigate, useParams } from "react-router-dom";

/**
 * UpdateComment Component
 * ----------------------
 * Allows a user to update an existing comment
 *
 * Route example:
 * /comments/update/:id
 */
const UpdateComment = () => {
  // Get comment ID from URL params
  const { id } = useParams();

  // Used to navigate back after successful update
  const navigate = useNavigate();

  // State for updated comment text
  const [comment, setComment] = useState("");

  // State for success or error message
  const [message, setMessage] = useState("");

  /**
   * Handles comment update submission
   * Sends PATCH request to backend
   */
  const handleUpdateComment = async (e) => {
    e.preventDefault();

    try {
      // API request to update comment
      const response = await api.patch(
        `/comments/c/${id}`,
        { content: comment },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Show success message
      setMessage(response.data.message || "Comment updated successfully!");

      // Clear textarea
      setComment("");

      // Navigate back to previous page after short delay
      setTimeout(() => navigate(-1), 1000);
    } catch (error) {
      // Show error message
      setMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        {/* Page Title */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Edit your comment
        </h2>

        {/* Success / Error Message */}
        {message && (
          <div
            className={`mb-4 text-sm ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        {/* Update Comment Form */}
        <form onSubmit={handleUpdateComment} className="space-y-4">
          {/* Comment Input */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Update your comment..."
            rows="3"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            {/* Cancel Button */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-sm rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>

            {/* Save Button */}
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateComment;



// import React, { useState } from "react";
// import api from "../../Api/api";
// import { useNavigate, useParams } from "react-router-dom";

// const UpdateComment = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [comment, setComment] = useState("");
//   const [message, setMessage] = useState("");

//   const handleUpdateComment = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.patch(
//         `/comments/c/${id}`,
//         { content: comment },
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       setMessage(response.data.message || "Comment updated successfully!");
//       setComment("");
//       setTimeout(() => navigate(-1), 1000); // wait before going back
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message ||
//           "Something went wrong. Please try again."
//       );
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
//       <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
//         <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
//           Edit your comment
//         </h2>

//         {/* Message */}
//         {message && (
//           <div
//             className={`mb-4 text-sm ${
//               message.toLowerCase().includes("success")
//                 ? "text-green-600"
//                 : "text-red-600"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleUpdateComment} className="space-y-4">
//           <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             placeholder="Update your comment..."
//             rows="3"
//             className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
//           />

//           <div className="flex justify-end space-x-3">
//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               className="px-4 py-2 text-sm rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateComment;
