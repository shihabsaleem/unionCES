import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Paper, Typography, Button, Box } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LogoutButton from "../../Component/LogoutButton"; // Assuming you created this earlier

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4">Welcome, {username}</Typography>
        <LogoutButton />
      </Box>

      <Grid container spacing={4}>
        {/* Officer Section Card */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate("/eofficer")}
          >
            <AdminPanelSettingsIcon
              sx={{ fontSize: 60, color: "#1976d2", mb: 2 }}
            />
            <Typography variant="h5" gutterBottom>
              Election Officer
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              align="center"
              paragraph
            >
              Manage candidates, view lists, and publish results.
            </Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/eofficer")}
            >
              Go to Admin Panel
            </Button>
          </Paper>
        </Grid>

        {/* Voter Section Card */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate("/Voter")}
          >
            <HowToVoteIcon sx={{ fontSize: 60, color: "#2e7d32", mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Voter Area
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              align="center"
              paragraph
            >
              Cast your vote and view live polling status.
            </Typography>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={() => navigate("/Voter")}
            >
              Go to Voting Booth
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
