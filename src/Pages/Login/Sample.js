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
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";

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
        // Assuming backend *might* return role in future, but for now defaulting to /voter or /dashboard
        // Since Signup goes to /dashboard, let's go to /dashboard for consistency unless it's a voter specific flow
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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-app)", // 60% - Light Gray
        py: 3,
        transition: "all 0.3s ease"
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
            borderRadius: "var(--border-radius-lg)", // 24px
            width: "100%",
            background: "var(--bg-card)", // 30% - White
            boxShadow: "var(--shadow-soft)",
            border: "1px solid rgba(0,0,0,0.02)"
          }}
        >
          {/* Logo / Icon Area */}
          <Box
            sx={{
              width: 60,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "var(--accent)", // 10% - Yellow
              color: "black",
              borderRadius: "18px",
              mb: 3,
              boxShadow: "0px 8px 16px rgba(255, 206, 7, 0.3)"
            }}
          >
            <HowToVoteIcon fontSize="large" sx={{ color: "#000" }} />
          </Box>

          <Typography component="h1" variant="h4" sx={{
            fontWeight: "800",
            mb: 1,
            color: "var(--text-primary)",
            letterSpacing: "-0.5px"
          }}>
            Welcome Back
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "var(--text-secondary)" }}>
            Please sign in to continue
          </Typography>

          {error && (
            <Alert severity="error" sx={{
              width: "100%",
              mb: 3,
              borderRadius: "var(--border-radius-md)",
              border: "1px solid #ffcccd"
            }}>
              {error}
            </Alert>
          )}

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <Box sx={{ mb: 3 }}>
              <TextField
                required
                fullWidth
                id="username"
                placeholder="Username / ID"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon sx={{ color: "var(--text-secondary)" }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "var(--border-radius-md)",
                    bgcolor: "var(--bg-app)",
                    border: "none",
                    "& fieldset": { border: "none" },
                    "&:hover fieldset": { border: "none" },
                    "&.Mui-focused fieldset": { border: "1px solid var(--accent)" },
                    height: "56px",
                    pl: 1
                  }
                }}
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: "var(--text-secondary)" }} />
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
                  sx: {
                    borderRadius: "var(--border-radius-md)",
                    bgcolor: "var(--bg-app)",
                    border: "none",
                    "& fieldset": { border: "none" },
                    "&:hover fieldset": { border: "none" },
                    "&.Mui-focused fieldset": { border: "1px solid var(--accent)" },
                    height: "56px",
                    pl: 1
                  }
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
                fontSize: "1.05rem",
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
              {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
            </Button>

            <Grid container justifyContent="center">
              <Grid item>
                <Typography variant="body2" sx={{ color: "var(--text-secondary)" }}>
                  Don't have an account?{" "}
                  <Link
                    component={RouterLink}
                    to="/signup"
                    underline="hover"
                    sx={{
                      fontWeight: "700",
                      color: "black"
                    }}
                  >
                    Sign Up
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