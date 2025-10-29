import React from "react";
import api from "../../Api/api";
import { useParams } from "react-router-dom";

const DeleteComment = () => {
  const { id } = useParams();

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/comments/c/${id}`);
      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };
  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteComment;
