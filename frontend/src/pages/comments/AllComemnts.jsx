// import React, { useEffect, useState } from 'react'
// import api from '../../Api/api';

// const AllComemnts = ({id, refresh}) => {

//    const [message, setMessage] = useState("");
//    const [comments, setComments] = useState([])
//     const [currentUser, setCurrentUser] = useState(null);

//    const fetchCurrentUser = async () => {
//     try {
//       const res = await api.get("/users/current-user");
//       setCurrentUser(res.data);
//       console.log(res.data)
//     } catch (error) {
//       console.log("Could not fetch current user", error);
//     }
//   };

//   const Allcomments = async() => {
//     try {
//       const response = await api.get(`/comments/${id}`)
//       console.log(response.data.data.comments)
//       setComments(response.data.data.comments)
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message || "Something went wrong. Please try again"
//       );
//     }
//   }

//   const handleLike = async(id) => {
//     try {
//       const response = await api.post(`/likes/toggle/c/${id}`)
//       console.log(response.data)
//     } catch (error) {
//       console.log(error.response.data)
//       setMessage(error.response.data.message)
//     }
//   }

//   useEffect(() => {
//     Allcomments(),
//     fetchCurrentUser()
//   }, [id, refresh])

//   return (
//     <div>
//       {
//         comments ? <div>
//           {
//             comments.map((comment) => (
//               <div className="flex items-start space-x-3 p-3 border-b dark:border-gray-700">
//   {/* Avatar */}
//   <img
//     src={comment.owner.avatar}
//     alt={comment.owner.username}
//     className="w-10 h-10 rounded-full object-cover"
//   />

//   {/* Comment Content */}
//   <div className="flex-1">
//     {/* Username + Date on same row */}
//     <div className="flex items-center space-x-2">
//       <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
//         {comment.owner.username}
//       </h3>
//       <span className="text-xs text-gray-500">
//         {new Date(comment.createdAt).toLocaleDateString()}
//       </span>
//     </div>

//     {/* Comment text */}
//     <p className="text-gray-700 dark:text-gray-300 mt-1">
//       {comment.content}
//     </p>

//     {/* Actions */}
//     <div className="flex space-x-4 mt-2 text-sm">
//       <button
//         onClick={() => handleLike(comment._id)}
//         className="text-blue-600 hover:underline"
//       >
//         👍 Like {comment.likesCount > 0 && `(${comment.likesCount})`}
//       </button>
//       <button className="text-gray-600 hover:underline">Reply</button>
//     </div>
//   </div>
// </div>

//           // </div>
//             ))
//           }
//         </div>: <h1>Loading the Commemnts
//           <h1>{message}</h1>
//         </h1>
//       }
//     </div>
//   )
// }

// export default AllComemnts

import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";

const AllComemnts = ({ id, refresh }) => {
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    try {
      const res = await api.get("/users/current-user");
      setCurrentUser(res.data.data);
    } catch (error) {
      console.log("Could not fetch current user", error);
    }
  };

  const Allcomments = async () => {
    try {
      const response = await api.get(`/comments/${id}`);
      setComments(response.data.data.comments);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again"
      );
    }
  };

  const handleLike = async (id) => {
    try {
      const response = await api.post(`/likes/toggle/c/${id}`);
      console.log(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error liking comment");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/comments/c/${id}`);
      setComments((prev) => prev.filter((c) => c._id !== id)); // remove from UI
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // later you can implement handleUpdate (open modal/edit mode)

  useEffect(() => {
    Allcomments();
    fetchCurrentUser();
  }, [id, refresh]);

  return (
    <div>
      {comments.length > 0 ? (
        <div>
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex items-start space-x-3 p-3 border-b dark:border-gray-700"
            >
              {/* Avatar */}
              <img
                src={comment.owner.avatar}
                alt={comment.owner.username}
                className="w-10 h-10 rounded-full object-cover"
              />

              {/* Comment Content */}
              <div className="flex-1">
                {/* Username + Date */}
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {comment.owner.username}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Comment text */}
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  {comment.content}
                </p>

                {/* Actions */}
                <div className="flex space-x-4 mt-2 text-sm">
                  <button
                    onClick={() => handleLike(comment._id)}
                    className="text-blue-600 hover:underline"
                  >
                    👍 Like{" "}
                    {comment.likesCount > 0 && `(${comment.likesCount})`}
                  </button>
                  <button className="text-gray-600 hover:underline">
                    Reply
                  </button>

                  {/* ✅ Only show Update/Delete if current user is owner */}
                  {currentUser?._id === comment.owner._id && (
                    <>
                      <button
                        onClick={() =>
                          navigate(`/comments/update/${comment._id}`)
                        }
                        className="text-yellow-600 hover:underline"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(comment._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          Loading the Comments
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default AllComemnts;
