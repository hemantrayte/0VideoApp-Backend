import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, Video, User, Menu, LogOut, Plus, ChartArea, ChartBar } from "lucide-react";
import api from "../Api/api";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/users/logout");

      // Clear token from localStorage
      localStorage.removeItem("accessToken");

      // Redirect user to login page
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md dark:bg-gray-900 sticky top-0 z-50">
      {/* Left Section - Menu + Logo */}
      <div className="flex items-center space-x-3">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
        </button>
        <Link to="/" className="flex items-center space-x-1 cursor-pointer">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
            alt="Logo"
            className="h-8"
          />
          <h1 className="text-xl font-bold hidden sm:block text-gray-800 dark:text-gray-100">
            MyTube
          </h1>
        </Link>
      </div>

      {/* Middle Section - Search Bar */}
      <div className="flex flex-1 max-w-2xl items-center mx-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-l-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 dark:text-gray-100"
        />
        <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-r-full hover:bg-gray-200 dark:hover:bg-gray-600">
          <Search className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Right Section - Links */}
      <div className="flex items-center space-x-3">
        <Link
          to="/videos/upload"
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Video className="h-6 w-6 text-gray-700 dark:text-gray-200" />
        </Link>
        <Link
          to="/notifications"
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative"
        >
          <ChartBar className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          <span className="absolute top-2 right-2 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </Link>
        <Link
          to="/user/current-user"
          className="p-1 rounded-full border border-gray-300 dark:border-gray-700 hover:shadow-md"
        >
          <User className="h-6 w-6 text-gray-700 dark:text-gray-200" />
        </Link>

        <Link
          to="/tweet/create"
          className="p-1 rounded-full border border-gray-300 dark:border-gray-700 hover:shadow-md"
        >
          <Plus className="h-6 w-6 text-gray-700 dark:text-gray-200" />
        </Link>

        {/* Logout button (icon style) */}
        <button
          onClick={handleLogout}
          className="p-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <LogOut className="h-6 w-6 text-red-600" />
        </button>
      </div>
    </header>
  );
};

export default Header;
