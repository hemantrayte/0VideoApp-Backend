import React, { useState } from "react";
import api from "../../Api/api";
import { useParams } from "react-router-dom";

const AddVideoToPlaylist = () => {
  const [message, setMessage] = useState("");
  const { playlistID, videoID } = useParams();

  const addVideoPlaylist = async () => {
    try {
      const response = await api.patch(
        `/playlist/add/${playlistID}/${videoID}`
      );

      console.log(response.data);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again"
      );
    }
  };

  return (
    <div>
      <button onClick={addVideoPlaylist}>Add Video to Playlist</button>
    </div>
  );
};

export default AddVideoToPlaylist;
