import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../Api/api";

const ChannelProfile = () => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const { username } = useParams();

  const [currentUser, setCurrentUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await api.get("users/current-user");
      console.log(response.data.data);
      setCurrentUser(response.data.data);
    } catch (error) {
      console.log("User not fetched", error);
    }
  };

  const fetchChannelProfile = async () => {
    try {
      const response = await api.get(`/users/c/${username}`);
      setMessage(response.data.message);
      setData(response.data.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to fetch channel");
    }
  };

  useEffect(() => {
    fetchChannelProfile();
    fetchUser();
  }, []);

  return (
    <div className="w-full bg-black min-h-screen text-white">
      {/* Error Message */}
      {message && !data && (
        <p className="text-center text-red-500 py-4">{message}</p>
      )}

      {data ? (
        <div>
          {/* Cover Image */}
          <div className="w-full h-48 md:h-60 bg-gray-800 overflow-hidden">
            <img
              src={data.coverImage}
              alt="cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Avatar + Info */}
          <div className="flex items-center px-6 -mt-12">
            <img
              src={data.avatar}
              alt="avatar"
              className="w-24 h-24 rounded-full border-4 border-black"
            />
            <div className="ml-4">
              <h1 className="text-2xl font-bold">{data.fullName}</h1>
              <h3 className="text-gray-400">@{data.username}</h3>
              <p className="text-gray-400 text-sm">{data.email}</p>
              <div className="flex space-x-4 text-sm text-gray-300 mt-2">
                <span>{data.subscribersCount} subscribers</span>
                <span>{data.channelsSubscribedToCount} subscribed</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 border-b border-gray-700 px-6">
            <ul className="flex space-x-6 text-gray-400 text-sm">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Videos</li>
              <li className="hover:text-white cursor-pointer">Playlists</li>
              {currentUser._id === data._id && (
                <>
                  <Link
                    to={`/channel/videos/${data._id}`}
                    className="hover:text-white cursor-pointer"
                  >
                    Channel Videos
                  </Link>
                  <Link
                    to={`/channel/stats/${data._id}`}
                    className="hover:text-white cursor-pointer"
                  >
                    Channel Stats
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <h1 className="text-center py-10 text-gray-400">
          Loading Channel Details...
        </h1>
      )}
    </div>
  );

  // return (
  //   <div className="max-w-5xl mx-auto bg-black min-h-screen text-white">
  //     {/* Error Message */}
  //     {message && !data && (
  //       <p className="text-center text-red-500 py-4">{message}</p>
  //     )}

  //     {data ? (
  //       <div>
  //         {/* Cover Image */}
  //         <div className="w-full h-48 md:h-60 bg-gray-800 overflow-hidden">
  //           <img
  //             src={data.coverImage}
  //             alt="cover"
  //             className="w-full h-full object-cover"
  //           />
  //         </div>

  //         {/* Avatar + Info */}
  //         <div className="flex items-center px-6 -mt-12">
  //           <img
  //             src={data.avatar}
  //             alt="avatar"
  //             className="w-24 h-24 rounded-full border-4 border-black"
  //           />
  //           <div className="ml-4">
  //             <h1 className="text-2xl font-bold">{data.fullName}</h1>
  //             <h3 className="text-gray-400">@{data.username}</h3>
  //             <p className="text-gray-400 text-sm">{data.email}</p>
  //             <div className="flex space-x-4 text-sm text-gray-300 mt-2">
  //               <span>{data.subscribersCount} subscribers</span>
  //               <span>{data.channelsSubscribedToCount} subscribed</span>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Tabs (like YouTube: Home, Videos, Playlists...) */}
  //         <div className="mt-6 border-b border-gray-700 px-6">
  //           <ul className="flex space-x-6 text-gray-400 text-sm">
  //             <li className="hover:text-white cursor-pointer">Home</li>
  //             <li className="hover:text-white cursor-pointer">Videos</li>
  //             <li className="hover:text-white cursor-pointer">Playlists</li>
  //             <li className="hover:text-white cursor-pointer">Community</li>
  //             <li className="hover:text-white cursor-pointer">About</li>
  //           </ul>
  //         </div>
  //       </div>
  //     ) : (
  //       <h1 className="text-center py-10 text-gray-400">
  //         Loading Channel Details...
  //       </h1>
  //     )}
  //   </div>
  // );
};

export default ChannelProfile;
