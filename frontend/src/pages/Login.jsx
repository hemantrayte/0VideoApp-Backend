import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await api.post("/users/login", formData, {
        headers: { "Content-Type": "application/json" },
      });
       
      
      setMessage(res.data.message || "User logged in successfully!");

      console.log("login")
      // Save token
      if (res.data?.data?.accessToken) {
        localStorage.setItem("accessToken", res.data.data.accessToken);
      }

      // Reset form
      setFormData({ email: "", password: "" });

      // Navigate to home/dashboard
      navigate("/");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
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
          Login to Your Account
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Access your account to upload and share videos
        </p>

        {message && (
          <div className="mb-4 text-center text-sm font-medium text-red-500">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
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

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-red-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
