import React from "react";
import api from "../../Api/api";
import { useParams } from "react-router-dom";

/**
 * DeleteComment Component
 * ----------------------
 * Deletes a comment using the comment ID from the URL
 *
 * Route example:
 * /comments/delete/:id
 */
const DeleteComment = () => {
  // Extract comment ID from route parameters
  const { id } = useParams();

  /**
   * Handles comment deletion
   * Sends DELETE request to backend API
   */
  const handleDelete = async () => {
    try {
      const response = await api.delete(`/comments/c/${id}`);
      console.log(response.data);
      // Later you can redirect or show success message
    } catch (error) {
      // Handle API or network errors
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div>
      {/* Delete button */}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteComment;


// import React from "react";
// import api from "../../Api/api";
// import { useParams } from "react-router-dom";

// const DeleteComment = () => {
//   const { id } = useParams();

//   const handleDelete = async () => {
//     try {
//       const response = await api.delete(`/comments/c/${id}`);
//       console.log(response.data);
//     } catch (error) {
//       console.log(error.response?.data || error.message);
//     }
//   };
//   return (
//     <div>
//       <button onClick={handleDelete}>Delete</button>
//     </div>
//   );
// };

// export default DeleteComment;
