import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/api"; // Axios helper for API requests

const Signup = () => {

  // State to store user form input values
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  // Hook used to redirect user after successful signup
  const navigate = useNavigate();

  // State to store selected avatar file
  const [avatar, setAvatar] = useState(null);

  // State to store selected cover image file (optional)
  const [coverImage, setCoverImage] = useState(null);

  // State to display success or error message
  const [message, setMessage] = useState("");

  // Function to handle input field changes (text inputs)
  const handleChange = (e) => {

    // Update formData state dynamically based on input name
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle file input changes (avatar and cover image)
  const handleFileChange = (e) => {

    // Check which file input was changed
    if (e.target.name === "avatar") {

      // Store avatar file
      setAvatar(e.target.files[0]);

    } else if (e.target.name === "coverImage") {

      // Store cover image file
      setCoverImage(e.target.files[0]);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {

    // Prevent page refresh
    e.preventDefault();

    try {

      // Create FormData object to send text + file data
      const data = new FormData();

      // Append user text fields
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("username", formData.username);
      data.append("password", formData.password);

      // Append avatar file if selected
      if (avatar) data.append("avatar", avatar);

      // Append cover image file if selected
      if (coverImage) data.append("coverImage", coverImage);

      // Send POST request to register user
      const res = await api.post("/users/register", data, {

        // Required header for file upload
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Display success message
      setMessage(res.data.message || "User registered successfully!");

      // Reset form fields after successful signup
      setFormData({
        fullName: "",
        email: "",
        username: "",
        password: "",
      });

      // Redirect user to home page or login page
      navigate("/");

    } catch (error) {

      // Log error for debugging
      console.log(error);

      // Display error message
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (

    // Main container for centering signup form
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">

      {/* Signup card container */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

        {/* Logo section */}
        <div className="flex justify-center mb-6">
          <span className="text-3xl font-bold text-red-600">YouTube</span>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold mb-2 text-center text-gray-800">
          Create your YouTube Account
        </h2>

        {/* Subheading */}
        <p className="text-sm text-gray-500 mb-6 text-center">
          Join the community to upload and share your videos
        </p>

        {/* Display success or error message */}
        {message && (
          <div className="mb-4 text-center text-sm font-medium text-red-500">
            {message}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name Input */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
            required
          />

          {/* Email Input */}
          <input
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
            required
          />

          {/* Username Input */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
            required
          />

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
            required
          />

          {/* Avatar Upload Input */}
          <div>
            <label className="block mb-1 text-gray-600 text-sm">
              Avatar <span className="text-red-500">(required)</span>
            </label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm"
              required
            />
          </div>

          {/* Cover Image Upload Input */}
          <div>
            <label className="block mb-1 text-gray-600 text-sm">
              Cover Image <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Sign Up
          </button>

        </form>

        {/* Login link */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-red-600 hover:underline">
            Sign In
          </a>
        </p>

      </div>
    </div>
  );
};

export default Signup;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../Api/api"; // import the helper

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     username: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const [avatar, setAvatar] = useState(null);
//   const [coverImage, setCoverImage] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     if (e.target.name === "avatar") {
//       setAvatar(e.target.files[0]);
//     } else if (e.target.name === "coverImage") {
//       setCoverImage(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const data = new FormData();
//       data.append("fullName", formData.fullName);
//       data.append("email", formData.email);
//       data.append("username", formData.username);
//       data.append("password", formData.password);
//       if (avatar) data.append("avatar", avatar);
//       if (coverImage) data.append("coverImage", coverImage);

//       // Use API helper instead of axios
//       const res = await api.post("/users/register", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setMessage(res.data.message || "User registered successfully!");

//       setFormData({
//         fullName: "",
//         email: "",
//         username: "",
//         password: "",
//       });
//       navigate("/");
//     } catch (error) {
//       console.log(error);
//       setMessage(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
//       <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
//         {/* Logo */}
//         <div className="flex justify-center mb-6">
//           <span className="text-3xl font-bold text-red-600">YouTube</span>
//         </div>

//         <h2 className="text-xl font-semibold mb-2 text-center text-gray-800">
//           Create your YouTube Account
//         </h2>
//         <p className="text-sm text-gray-500 mb-6 text-center">
//           Join the community to upload and share your videos
//         </p>

//         {message && (
//           <div className="mb-4 text-center text-sm font-medium text-red-500">
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             value={formData.fullName}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
//             required
//           />

//           <input
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
//             required
//           />

//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
//             required
//           />

//           <div>
//             <label className="block mb-1 text-gray-600 text-sm">
//               Avatar <span className="text-red-500">(required)</span>
//             </label>
//             <input
//               type="file"
//               name="avatar"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="w-full text-sm"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-gray-600 text-sm">
//               Cover Image <span className="text-gray-400">(optional)</span>
//             </label>
//             <input
//               type="file"
//               name="coverImage"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="w-full text-sm"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
//           >
//             Sign Up
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-center text-gray-500 text-sm mt-6">
//           Already have an account?{" "}
//           <a href="/login" className="text-red-600 hover:underline">
//             Sign In
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;
