import axios from "axios";

// Create a custom axios instance
const api = axios.create({
  baseURL: "http://localhost:8000/api/v1", // Base backend URL
});

// Automatically attach access token to every request
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("accessToken");

    // If token exists, add it to Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config; // Continue request
  },
  (error) => {
    return Promise.reject(error); // Handle request error
  }
);

export default api;


// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000/api/v1",
// });

// // Automatically add access token to all requests
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;
