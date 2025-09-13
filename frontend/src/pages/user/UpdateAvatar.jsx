import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/api";

const UpdateAvatar = () => {
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]); // directly store file
  };

  const handleAvatarSubmit = async (e) => {
    e.preventDefault();

    if (!avatar) {
      setMessage("Please select an image to upload.");
      return;
    }

    try {
      // Create FormData and append the file
      const formData = new FormData();
      formData.append("avatar", avatar);

      const res = await api.patch("/users/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message || "User Avatar updated successfully!");
      alert("User Avatar updated successfully!");
      navigate("/user/current-user");
    } catch (error) {
      console.error("Error while updating avatar:", error);
      setMessage(error.response?.data?.message || "Failed to update avatar");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Update Avatar
        </h1>

        <form onSubmit={handleAvatarSubmit} className="space-y-4">
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition duration-200"
          >
            Update Avatar
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.toLowerCase().includes("success")
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default UpdateAvatar;
