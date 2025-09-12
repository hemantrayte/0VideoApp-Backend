import React from "react";
import { Search, Bell, Video, User } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md sticky top-0 z-50">
      {/* Left Section - Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
          alt="Logo"
          className="h-8 cursor-pointer"
        />
        <h1 className="text-xl font-bold hidden sm:block">MyTube</h1>
      </div>

      {/* Middle Section - Search Bar */}
      <div className="flex flex-1 max-w-xl items-center mx-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <button className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-r-full hover:bg-gray-200">
          <Search className="h-5 w-5" />
        </button>
      </div>

      {/* Right Section - Icons */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Video className="h-6 w-6" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell className="h-6 w-6" />
        </button>
        <button className="p-1 rounded-full border border-gray-300">
          <User className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
