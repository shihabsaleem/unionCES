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
      const response = await fetch("http://localhost:8000/api/signup/", {
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
    <div className="min-h-screen flex bg-white">

      {/* Left Side - Visual/Illustration */}
      <div className="hidden lg:flex w-1/2 bg-gray-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          {/* Abstract Geometric Shapes or Gradient (Different Variant) */}
          <div className="absolute top-[20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-purple-600 blur-[120px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent blur-[100px] opacity-20"></div>
        </div>

        <div className="relative z-10 p-12 text-center text-white max-w-lg">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl border border-white/20">
            <HowToVoteIcon style={{ fontSize: 40, color: '#f3f4f6' }} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-6">
            Join the Movement
          </h1>
          <p className="text-lg text-gray-300 font-light leading-relaxed">
            Create your account to participate in the democratic process. Your voice matters.
          </p>
        </div>
      </div>


      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 md:p-16 bg-gray-50">
        <div className="w-full max-w-md space-y-6">

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Fill in your details to get started.
            </p>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 p-4 border border-red-100 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="rounded-xl bg-green-50 p-4 border border-green-100 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-sm font-medium text-green-700">{success}</p>
            </div>
          )}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>

            {/* Username */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <PersonOutlineIcon className="h-5 w-5 text-gray-400 group-focus-within:text-accent transition-colors" />
              </div>
              <input
                name="username"
                type="text"
                required
                className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                placeholder="Choose a Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <EmailOutlinedIcon className="h-5 w-5 text-gray-400 group-focus-within:text-accent transition-colors" />
              </div>
              <input
                name="email"
                type="text"
                required
                className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <LockOutlinedIcon className="h-5 w-5 text-gray-400 group-focus-within:text-accent transition-colors" />
              </div>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="block w-full pl-11 pr-12 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <LockOutlinedIcon className="h-5 w-5 text-gray-400 group-focus-within:text-accent transition-colors" />
              </div>
              <input
                name="confirmPassword"
                type="password"
                required
                className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 shadow-sm"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-semibold rounded-xl text-black bg-accent hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-500/30 transition-all shadow-lg shadow-yellow-400/20 active:scale-[0.98] mt-4"
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
              </button>
            </div>

            <div className="flex items-center justify-center pt-2">
              <span className="text-sm text-gray-500">Already member? </span>
              <RouterLink to="/" className="ml-2 text-sm font-semibold text-gray-900 hover:underline">
                Sign in
              </RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
