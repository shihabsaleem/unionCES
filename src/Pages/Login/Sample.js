import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper"; // Added for card look
import Container from "@mui/material/Container"; // Added for centering

// Icons
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import HowToVoteIcon from '@mui/icons-material/HowToVote';

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
        window.location.href = "/dashboard";
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
    // 1. Full Screen Background Container
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ece9e6 0%, #ffffff 100%)", // Subtle gradient
        py: 3
      }}
    >
      <Container maxWidth="xs">
        {/* 2. The Card Component */}
        <Paper
          elevation={10}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 3,
            width: "100%",
          }}
        >
          {/* --- LOGO --- */}
          <Box
            sx={{
              bgcolor: "primary.main",
              color: "white",
              p: 1.5,
              borderRadius: "16px", // Softer corners
              display: "flex",
              mb: 2,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            <HowToVoteIcon fontSize="large" />
          </Box>

          {/* --- HEADERS --- */}
          <Typography component="h1" variant="h5" sx={{ fontWeight: "700", mb: 0.5 }}>
            CES Union
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Welcome back! Please enter your details.
          </Typography>

          {/* --- ERROR MESSAGE --- */}
          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {/* --- FORM --- */}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username / ID"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon color="action" />
                  </InputAdornment>
                ),
              }}
              // Rounder inputs
              sx={{ 
                "& .MuiOutlinedInput-root": { borderRadius: 2 } 
              }} 
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ 
                "& .MuiOutlinedInput-root": { borderRadius: 2 } 
              }}
            />

            <Grid container sx={{ mt: 1, mb: 2 }}>
              <Grid item xs>
               {/* Optional: Add "Remember me" checkbox here in the future */}
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" underline="hover" sx={{ fontWeight: 500 }}>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: 2,
                textTransform: "none", // Removes ALL CAPS style
                boxShadow: 3,
                mb: 3,
                background: "linear-gradient(to right, #1976d2, #1565c0)", // Gradient button
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
            </Button>

            <Grid container justifyContent="center">
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{" "}
                  <Link href="/signup" variant="body2" underline="hover" sx={{ fontWeight: "bold" }}>
                    Sign Up
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        
        {/* Footer Copyright */}
        <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ mt: 4 }}>
            © {new Date().getFullYear()} CES Union. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}