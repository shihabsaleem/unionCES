import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import CircularProgress from "@mui/material/CircularProgress";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);

        // Role-based Redirect
        if (data.is_staff) {
          window.location.href = "/eofficer";
        } else {
          window.location.href = "/voter";
        }
      } else {
        setError(data.error || "Invalid credentials.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-3 transition-all duration-300">
      <div className="w-full max-w-xs p-0">
        <div className="bg-white p-10 flex flex-col items-center rounded-3xl shadow-lg border border-gray-100">

          {/* Logo */}
          <div className="w-16 h-16 flex items-center justify-center bg-accent text-black rounded-2xl mb-6 shadow-md shadow-yellow-400/30">
            <HowToVoteIcon fontSize="large" className="text-black" />
          </div>

          <h1 className="text-3xl font-extrabold mb-1 text-gray-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-gray-500 mb-8 text-base">
            Please sign in to continue
          </p>

          {error && (
            <div className="w-full mb-6 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {/* Username Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PersonOutlineIcon className="text-gray-400" />
              </div>
              <input
                type="text"
                required
                id="username"
                className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border-none rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all duration-200"
                placeholder="Username / ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockOutlinedIcon className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                id="password"
                className="w-full pl-10 pr-10 py-3.5 bg-gray-50 border-none rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all duration-200"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-accent text-black font-bold rounded-xl shadow-none hover:bg-accent-hover active:scale-95 transition-all duration-200"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
            </button>

            <div className="flex justify-center mt-4">
              <p className="text-gray-500 text-sm">
                Don't have an account?{" "}
                <RouterLink
                  to="/signup"
                  className="font-bold text-gray-900 hover:underline"
                >
                  Sign Up
                </RouterLink>
              </p>
            </div>
          </form>
        </div>

        <p className="text-center mt-8 text-gray-400 text-xs opacity-70">
          © {new Date().getFullYear()} CES Union
        </p>
      </div>
    </div>
  );
}