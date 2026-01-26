import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

// Icons
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import HowToVoteIcon from '@mui/icons-material/HowToVote';

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
        setTimeout(() => {
          navigate("/dashboard");
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

  // Shared Input Styles
  const inputStyles = {
    borderRadius: "var(--border-radius-md)",
    bgcolor: "var(--bg-app)",
    border: "none",
    "& fieldset": { border: "none" },
    "&:hover fieldset": { border: "none" },
    "&.Mui-focused fieldset": { border: "1px solid var(--accent)" },
    height: "56px",
    pl: 1
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-app)",
        py: 3
      }}
    >
      <Container maxWidth="xs" sx={{ p: 0 }}>
        <Paper
          elevation={0}
          sx={{
            p: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "var(--border-radius-lg)",
            width: "100%",
            background: "var(--bg-card)",
            boxShadow: "var(--shadow-soft)",
            border: "1px solid rgba(0,0,0,0.02)"
          }}
        >
          <Box
            sx={{
              width: 50,
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "var(--accent)",
              color: "black",
              borderRadius: "14px",
              mb: 2,
              boxShadow: "0px 6px 12px rgba(255, 206, 7, 0.3)"
            }}
          >
            <HowToVoteIcon fontSize="medium" sx={{ color: "#000" }} />
          </Box>

          <Typography component="h1" variant="h5" sx={{ fontWeight: "800", mb: 0.5, color: "var(--text-primary)" }}>
            Create Account
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: "var(--text-secondary)" }}>
            Join UnionCES today!
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 3, borderRadius: "var(--border-radius-md)", border: "1px solid #ffcccd" }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ width: "100%", mb: 3, borderRadius: "var(--border-radius-md)", border: "1px solid #c8e6c9" }}>
              {success}
            </Alert>
          )}

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: "100%" }}>
            {/* Username */}
            <Box sx={{ mb: 2 }}>
              <TextField
                required
                fullWidth
                id="username"
                placeholder="Username / ID"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon sx={{ color: "var(--text-secondary)" }} />
                    </InputAdornment>
                  ),
                  sx: inputStyles
                }}
              />
            </Box>

            {/* Email */}
            <Box sx={{ mb: 2 }}>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon sx={{ color: "var(--text-secondary)" }} />
                    </InputAdornment>
                  ),
                  sx: inputStyles
                }}
              />
            </Box>

            {/* Password */}
            <Box sx={{ mb: 2 }}>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: "var(--text-secondary)" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box
                        sx={{ cursor: 'pointer', display: 'flex' }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff sx={{ color: "var(--text-secondary)" }} /> : <Visibility sx={{ color: "var(--text-secondary)" }} />}
                      </Box>
                    </InputAdornment>
                  ),
                  sx: inputStyles
                }}
              />
            </Box>

            {/* Confirm Password */}
            <Box sx={{ mb: 3 }}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: "var(--text-secondary)" }} />
                    </InputAdornment>
                  ),
                  sx: inputStyles
                }}
              />
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.8,
                fontSize: "1rem",
                fontWeight: "700",
                borderRadius: "var(--border-radius-md)",
                textTransform: "none",
                boxShadow: "none",
                mb: 3,
                bgcolor: "var(--accent)",
                color: "black",
                "&:hover": {
                  bgcolor: "#E6B800",
                  boxShadow: "0px 4px 12px rgba(255, 206, 7, 0.4)"
                }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Create Account"}
            </Button>

            <Grid container justifyContent="center">
              <Grid item>
                <Typography variant="body2" sx={{ color: "var(--text-secondary)" }}>
                  Already have an account?{" "}
                  <Link component={RouterLink} to="/" underline="hover" sx={{ fontWeight: "700", color: "black" }}>
                    Sign In
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Typography variant="caption" align="center" display="block" sx={{ mt: 4, color: "var(--text-secondary)", opacity: 0.7 }}>
          © {new Date().getFullYear()} CES Union
        </Typography>
      </Container>
    </Box>
  );
}
