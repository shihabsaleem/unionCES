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
      const response = await fetch("http://localhost:8000/api/login/", {
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
    <div className="min-h-screen flex bg-white">

      {/* Left Side - Visual/Illustration */}
      <div className="hidden lg:flex w-1/2 bg-gray-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          {/* Abstract Geometric Shapes or Gradient */}
          <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-accent blur-[120px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600 blur-[100px] opacity-20"></div>
        </div>

        <div className="relative z-10 p-12 text-center text-white max-w-lg">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl border border-white/20">
            <HowToVoteIcon style={{ fontSize: 50, color: '#FFCE07' }} />
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            UnionCES <span className="text-accent">2026</span>
          </h1>
          <p className="text-xl text-gray-300 font-light leading-relaxed">
            Empowering the student body through efficient, secure, and transparent digital voting.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 md:p-16 bg-gray-50">
        <div className="w-full max-w-md space-y-8">

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please enter your credentials to access the portal.
            </p>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 p-4 border border-red-100 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">

              {/* Username */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <PersonOutlineIcon className="h-5 w-5 text-gray-400 group-focus-within:text-accent transition-colors" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                  placeholder="Username / ID"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockOutlinedIcon className="h-5 w-5 text-gray-400 group-focus-within:text-accent transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full pl-11 pr-12 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-semibold rounded-xl text-black bg-accent hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-500/30 transition-all shadow-lg shadow-yellow-400/20 active:scale-[0.98]"
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In to Account"}
              </button>
            </div>

            <div className="flex items-center justify-center pt-4">
              <span className="text-sm text-gray-500">New here? </span>
              <RouterLink to="/signup" className="ml-2 text-sm font-semibold text-gray-900 hover:underline">
                Create an account
              </RouterLink>
            </div>
          </form>

          <p className="pt-8 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} CES Union. Secure Election System.
          </p>
        </div>
      </div>
    </div>
  );
}