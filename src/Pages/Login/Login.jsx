import React from "react";
import Signin from "../../Component/Login/Login.jsx";
import clg from "../../Assets/clg.jpg";

const Login = () => {
  return (
    <div className="login">
      <div>
        <img src={clg} />
      </div>
      <div className="button">
        <Signin />
      </div>
    </div>
  );
};

export default Login;
