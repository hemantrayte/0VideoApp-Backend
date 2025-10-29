import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/api"; // import the helper

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "avatar") {
      setAvatar(e.target.files[0]);
    } else if (e.target.name === "coverImage") {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("username", formData.username);
      data.append("password", formData.password);
      if (avatar) data.append("avatar", avatar);
      if (coverImage) data.append("coverImage", coverImage);

      // Use API helper instead of axios
      const res = await api.post("/users/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message || "User registered successfully!");

      setFormData({
        fullName: "",
        email: "",
        username: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <span className="text-3xl font-bold text-red-600">YouTube</span>
        </div>

        <h2 className="text-xl font-semibold mb-2 text-center text-gray-800">
          Create your YouTube Account
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Join the community to upload and share your videos
        </p>

        {message && (
          <div className="mb-4 text-center text-sm font-medium text-red-500">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
            required
          />

          <input
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
            required
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
            required
          />

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

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
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
