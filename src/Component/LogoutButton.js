import React from "react";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear Token and User Data
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    // 2. Redirect to Login Page
    navigate("/");
  };

  return (
    <Button
      variant="contained"
      color="error"
      startIcon={<LogoutIcon />}
      onClick={handleLogout}
      sx={{ m: 1 }} // Add some margin
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
