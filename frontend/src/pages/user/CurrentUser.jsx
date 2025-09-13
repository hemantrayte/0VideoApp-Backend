import React, { useEffect, useState } from "react";
import api from "../../Api/api";
import { useNavigate } from "react-router-dom";

const CurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await api.get("users/current-user");
      console.log(response.data.data);
      setCurrentUser(response.data.data);
    } catch (error) {
      console.log("User not fetched", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
          Profile Not Fetched
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        {/* Avatar */}
        <img
          src={currentUser.avatar}
          alt={currentUser.username}
          className="w-32 h-32 rounded-full mx-auto border-4 border-red-600 shadow-md"
        />

        {/* Username */}
        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
          {currentUser.username}
        </h1>

        {/* Full Name */}
        <h3 className="text-gray-600 dark:text-gray-400 text-lg">
          {currentUser.fullName}
        </h3>

        {/* Email */}
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          {currentUser.email}
        </p>

        {/* Update Button */}
        <button
          onClick={() => navigate("/user/update")}
          className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 shadow transition duration-200"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default CurrentUser;
