import React from "react";
import { GoogleLogin } from "@moeindana/google-oauth";

const Login = () => {
  return (
    <div>
      <GoogleLogin
        onSuccess={(response) => {
          console.log(response);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default Login;
