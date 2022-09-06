import React from "react";
import "./navbar.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            Hi, Admin <AccountCircleIcon className="icon" />
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Navbar;
