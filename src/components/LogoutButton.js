import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <Button
      variant="contained"
      startIcon={<LogoutIcon />}
      onClick={handleLogout}
      sx={{
        bgcolor: '#ffeece', // Very light orange/yellow background
        color: '#d4a000', // Darker yellow/orange text
        fontWeight: '700',
        boxShadow: 'none',
        borderRadius: 'var(--border-radius-md)',
        textTransform: 'none',
        '&:hover': {
          bgcolor: '#ffe0b2',
          boxShadow: 'none'
        }
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
