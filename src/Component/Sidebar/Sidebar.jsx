import React from "react";
import "./sidebar.scss";
import HomeIcon from "@mui/icons-material/Home";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">UNION</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <li>
            <HomeIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <li>
            <HowToVoteIcon className="icon" />
            <span>Add Candidate</span>
          </li>
          <li>
            <HowToRegIcon className="icon" />
            <span>List</span>
          </li>
          <li>
            <EqualizerIcon className="icon" />
            <span>Result</span>
          </li>
          <li>
            <LogoutIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      
    </div>
  );
};

export default Sidebar;
