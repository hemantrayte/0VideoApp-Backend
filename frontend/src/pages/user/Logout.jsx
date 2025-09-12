import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/api"; // your axios helper

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/users/logout", {});

      // Clear token from localStorage
      localStorage.removeItem("accessToken");

      // Redirect user to login page
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
