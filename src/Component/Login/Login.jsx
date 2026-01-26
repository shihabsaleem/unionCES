import React from "react";
import { GoogleLogin } from "@moeindana/google-oauth";
import jwt_decode from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      <GoogleLogin
        onSuccess={(response) => {
          var decoded = jwt_decode(response.credential);
          navigate("/voter");
        }}
        onError={() => {
          // Handle error gracefully
        }}
      />
    </div>
  );
};

export default Login;
