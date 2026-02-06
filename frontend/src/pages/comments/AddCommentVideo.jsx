import React, { useState } from "react";
import api from "../../Api/api";

/**
 * AddCommentVideo Component
 * ------------------------
 * Allows a user to add a comment to a specific video
 *
 * Props:
 * - id: video ID to which the comment will be added
 * - onCommentAdded: callback function to refresh comments after posting
 */
const AddCommentVideo = ({ id, onCommentAdded }) => {
  // State to store the new comment text
  const [newComment, setNewComment] = useState("");

  /**
   * Handles comment submission
   * - Prevents page reload
   * - Validates input
   * - Sends POST request to backend
   */
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    // Prevent empty or whitespace-only comments
    if (!newComment.trim()) return;

    try {
      // API call to add a comment for the given video
      const res = await api.post(
        `/comments/${id}`,
        {
          content: newComment,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Clear input field after successful submission
      setNewComment("");

      // Debug / confirmation log
      console.log(res.data.data);

      // Notify parent component to refresh comments list
      if (onCommentAdded) onCommentAdded();
    } catch (error) {
      // Handle API or network errors
      console.log("Error posting comment", error);
    }
  };

  return (
    <div>
      {/* Comment input form */}
      <form onSubmit={handleCommentSubmit} className="mb-4 flex space-x-2">
        {/* Comment text input */}
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 p-2 border rounded-lg dark:bg-gray-900 dark:text-white"
        />

        {/* Submit button */}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddCommentVideo;


// import React, { useState } from "react";
// import api from "../../Api/api";

// const AddCommentVideo = ({ id, onCommentAdded }) => {
//   const [newComment, setNewComment] = useState("");

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;

//     try {
//       const res = await api.post(
//         `/comments/${id}`,
//         {
//           content: newComment,
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       setNewComment("");
//       console.log(res.data.data);
//       if (onCommentAdded) onCommentAdded();
//     } catch (error) {
//       console.log("Error posting comment", error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleCommentSubmit} className="mb-4 flex space-x-2">
//         <input
//           type="text"
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Add a comment..."
//           className="flex-1 p-2 border rounded-lg dark:bg-gray-900 dark:text-white"
//         />
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//         >
//           Post
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddCommentVideo;
