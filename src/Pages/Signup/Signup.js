import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import CircularProgress from "@mui/material/CircularProgress";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Account created successfully! Redirecting...");
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        // Default to voter on signup unless backend assigns staff logic on register (unlikely for now)
        setTimeout(() => {
          navigate("/voter");
        }, 1500);
      } else {
        setError(data.error || "Registration failed.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-3">
      <div className="w-full max-w-xs p-0">
        <div className="bg-white p-8 flex flex-col items-center rounded-3xl shadow-lg border border-gray-100">
          <div className="w-14 h-14 flex items-center justify-center bg-accent text-black rounded-xl mb-4 shadow-md shadow-yellow-400/30">
            <HowToVoteIcon fontSize="medium" className="text-black" />
          </div>

          <h1 className="text-2xl font-extrabold mb-1 text-gray-900 tracking-tight">
            Create Account
          </h1>
          <p className="text-gray-500 mb-6 text-sm">
            Join UnionCES today!
          </p>

          {error && (
            <div className="w-full mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="w-full mb-4 p-3 rounded-xl bg-green-50 border border-green-100 text-green-600 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full space-y-3">
            {/* Username */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PersonOutlineIcon className="text-gray-400" />
              </div>
              <input
                type="text"
                required
                name="username"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all duration-200"
                placeholder="Username / ID"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EmailOutlinedIcon className="text-gray-400" />
              </div>
              <input
                type="text"
                required
                name="email"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all duration-200"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockOutlinedIcon className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                name="password"
                className="w-full pl-10 pr-10 py-3 bg-gray-50 border-none rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all duration-200"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockOutlinedIcon className="text-gray-400" />
              </div>
              <input
                type="password"
                required
                name="confirmPassword"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all duration-200"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent text-black font-bold rounded-xl shadow-none hover:bg-accent-hover active:scale-95 transition-all duration-200 mt-2"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
            </button>

            <div className="flex justify-center mt-3">
              <p className="text-gray-500 text-sm">
                Already have an account?{" "}
                <RouterLink to="/" className="font-bold text-gray-900 hover:underline">
                  Sign In
                </RouterLink>
              </p>
            </div>
          </form>
        </div>

        <p className="text-center mt-6 text-gray-400 text-xs opacity-70">
          © {new Date().getFullYear()} CES Union
        </p>
      </div>
    </div>
  );
}
