import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography, Box } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LogoutButton from "../../Component/LogoutButton";

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";

  // Card Style (Glassmorphism / Apple Card)
  const cardStyle = {
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "var(--border-radius-lg)",
    bgcolor: "var(--bg-card)",
    boxShadow: "var(--shadow-soft)",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    border: "1px solid rgba(0,0,0,0.02)",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0px 20px 40px rgba(0,0,0,0.08)",
      borderColor: "rgba(0,0,0,0.05)"
    }
  };

  const buttonStyle = {
    mt: 3,
    width: "100%",
    py: 1.5,
    borderRadius: "var(--border-radius-md)",
    bgcolor: "var(--accent)",
    color: "black",
    fontWeight: "700",
    textAlign: 'center',
    cursor: 'pointer',
    "&:hover": {
      opacity: 0.9
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 10 }}>
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={6}
        sx={{
          bgcolor: "var(--bg-card)",
          p: 3,
          borderRadius: "var(--border-radius-lg)",
          boxShadow: "var(--shadow-soft)"
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "var(--text-primary)" }}>
            Welcome back, {username}
          </Typography>
          <Typography variant="body1" sx={{ color: "var(--text-secondary)", mt: 0.5 }}>
            Access your election dashboard below
          </Typography>
        </Box>
        <LogoutButton />
      </Box>

      {/* Cards Grid */}
      <Grid container spacing={4}>
        {/* Officer Section Card */}
        <Grid item xs={12} md={6}>
          <Box
            sx={cardStyle}
            onClick={() => navigate("/eofficer")}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "24px",
                bgcolor: "rgba(25, 118, 210, 0.1)",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3
              }}
            >
              <AdminPanelSettingsIcon sx={{ fontSize: 40, color: "#1976d2" }} />
            </Box>

            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              Election Officer
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              align="center"
              sx={{ px: 2, mb: 2 }}
            >
              Manage candidates, view lists, and publish results.
            </Typography>

            <Box sx={buttonStyle} onClick={(e) => { e.stopPropagation(); navigate("/eofficer"); }}>
              Enter Admin Panel
            </Box>
          </Box>
        </Grid>

        {/* Voter Section Card */}
        <Grid item xs={12} md={6}>
          <Box
            sx={cardStyle}
            onClick={() => navigate("/Voter")}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "24px",
                bgcolor: "rgba(46, 125, 50, 0.1)",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3
              }}
            >
              <HowToVoteIcon sx={{ fontSize: 40, color: "#2e7d32" }} />
            </Box>

            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
              Voter Area
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              align="center"
              sx={{ px: 2, mb: 2 }}
            >
              Cast your vote and view live polling status.
            </Typography>

            <Box sx={buttonStyle} onClick={(e) => { e.stopPropagation(); navigate("/Voter"); }}>
              Enter Voting Booth
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
