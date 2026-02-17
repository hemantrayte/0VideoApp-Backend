import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/api"; // Axios instance configured for API requests

const Logout = () => {

  // Hook used for navigation after logout
  const navigate = useNavigate();

  // Function to handle user logout
  const handleLogout = async () => {
    try {

      // Send logout request to backend API
      // This helps invalidate refresh tokens or clear cookies on server
      await api.post("/users/logout", {});

      // Remove access token from localStorage
      // This prevents further authenticated API requests
      localStorage.removeItem("accessToken");

      // Redirect user to login page after logout
      navigate("/login");

    } catch (error) {

      // Display error message if logout fails
      console.error(
        error.response?.data?.message || "Logout failed"
      );
    }
  };

  return (

    // Container to center logout button on screen
    <div className="flex justify-center items-center h-screen">

      {/* Logout Button */}
      <button
        onClick={handleLogout} // call logout function on click
        className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition"
      >
        Logout
      </button>

    </div>
  );
};

export default Logout;


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../Api/api"; // your axios helper

// const Logout = () => {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await api.post("/users/logout", {});

//       // Clear token from localStorage
//       localStorage.removeItem("accessToken");

//       // Redirect user to login page
//       navigate("/login");
//     } catch (error) {
//       console.error(error.response?.data?.message || "Logout failed");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button
//         onClick={handleLogout}
//         className="bg-red-600 text-white px-6 py-2 rounded-lg shadow hover:bg-red-700 transition"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Logout;
