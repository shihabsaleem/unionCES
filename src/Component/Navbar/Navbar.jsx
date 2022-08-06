import React from "react";
import "./navbar.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="item">
          Hi, User <AccountCircleIcon />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
