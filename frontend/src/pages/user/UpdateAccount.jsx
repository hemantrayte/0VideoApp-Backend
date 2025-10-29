import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/api";

const UpdateAccount = () => {
  const [currentUser, setCurrentUser] = useState({
    fullName: "",
    email: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value,
    });
  };

  const fetchUser = async () => {
    try {
      const response = await api.get("users/current-user");
      setCurrentUser(response.data.data);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to fetch user data",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" }); // reset message

    try {
      const response = await api.patch("/users/update-account", currentUser, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage({
        type: "success",
        text: response.data.message || "User updated successfully!",
      });

      // redirect after short delay
      setTimeout(() => {
        navigate("/user/current-user");
      }, 1500);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Error occurred while updating the user",
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Update Account
        </h2>

        {/* Update Avatar */}
        <div className="mb-6 text-center">
          <button
            onClick={() => navigate("/user/update/avatar")}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Update Avatar
          </button>
        </div>

        {/* Update Avatar */}
        <div className="mb-6 text-center">
          <button
            onClick={() => navigate("/user/update/cover-image")}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Update CoverImage
          </button>
        </div>

        {/* Update Avatar */}
        <div className="mb-6 text-center">
          <button
            onClick={() => navigate("/user/update/password")}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Update Password
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={currentUser.fullName || ""}
              onChange={handleInputChange}
              name="fullName"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={currentUser.email || ""}
              onChange={handleInputChange}
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition duration-200"
          >
            Save Changes
          </button>
        </form>

        {/* Message Display */}
        {message.text && (
          <p
            className={`mt-4 text-center font-medium ${
              message.type === "success"
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default UpdateAccount;
