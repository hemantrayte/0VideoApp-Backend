import React, { useState, useEffect } from "react";
import api from "../../Api/api";
import { useParams } from "react-router-dom";
import { ThumbsUp, Users, Video, Eye } from "lucide-react"; // nice icons

const ChannelStats = () => {
  const [channelStats, setChannelStats] = useState(null);
  const [message, setMessage] = useState("");

  const { id } = useParams();

  const channelData = async () => {
    try {
      const response = await api.get(`/dashboard/stats/${id}`);
      setChannelStats(response.data.data);
    } catch (error) {
      console.log(error.response);
      setMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again"
      );
    }
  };

  useEffect(() => {
    channelData();
  }, []);

  if (message) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-medium">{message}</p>
      </div>
    );
  }

  if (!channelStats) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
          Loading Channel Stats...
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Channel Analytics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Likes */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 flex items-center space-x-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <ThumbsUp className="text-blue-600 dark:text-blue-300 w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Likes
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {channelStats.totalLikes}
            </p>
          </div>
        </div>

        {/* Subscribers */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 flex items-center space-x-4">
          <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
            <Users className="text-red-600 dark:text-red-300 w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Subscribers
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {channelStats.totalSubscribers}
            </p>
          </div>
        </div>

        {/* Videos */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 flex items-center space-x-4">
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
            <Video className="text-green-600 dark:text-green-300 w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Videos</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {channelStats.totalVideos}
            </p>
          </div>
        </div>

        {/* Views */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 flex items-center space-x-4">
          <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
            <Eye className="text-purple-600 dark:text-purple-300 w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Views
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {channelStats.totalViews}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelStats;
