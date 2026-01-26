import React from "react";
import "./navbar.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search"; // Optional: Added search for standard dashboard look

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchIcon className="icon" />
        </div>
        <div className="items">
          <div className="item">
            <span className="adminText">Hi, Admin</span>
            <AccountCircleIcon className="avatar" />
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Navbar;