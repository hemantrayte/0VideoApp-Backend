

import React, { useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";

const UploadVideo = () => {
  const [data, setData] = useState({ title: "", description: "" });
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "videoFile") {
      setVideoFile(e.target.files[0]);
    } else if (e.target.name === "thumbnail") {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnail);

    try {
      const response = await api.post("/videos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message);
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to upload video");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-xl font-bold text-center mb-2">
          Upload Your Video
        </h1>

        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleInputChange}
          placeholder="Enter video title"
          required
          className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <textarea
          name="description"
          value={data.description}
          onChange={handleInputChange}
          placeholder="Enter video description"
          required
          className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <input
          type="file"
          name="videoFile"
          accept="video/*"
          onChange={handleFileChange}
          required
          className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
                     file:rounded-full file:border-0 file:text-sm file:font-semibold
                     file:bg-red-600 file:text-white hover:file:bg-red-700"
        />

        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 
                     file:rounded-full file:border-0 file:text-sm file:font-semibold
                     file:bg-red-600 file:text-white hover:file:bg-red-700"
        />

        <button
          type="submit"
          className="w-full py-2 bg-red-600 hover:bg-red-700 rounded font-semibold shadow"
        >
          Upload Video
        </button>

        {message && (
          <p className="text-center mt-2 text-sm text-green-400">{message}</p>
        )}
      </form>
    </div>
  );
};

export default UploadVideo;
