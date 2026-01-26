import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If token exists, render the page (children). 
  // If not, redirect to Login page ("/")
  return token ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;