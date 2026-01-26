import React from "react";
import "./sidebar.scss";
import HomeIcon from "@mui/icons-material/Home";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import logo from "../../Assets/logoh.svg";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/eofficer">
          <span className="logo">
            <img src={logo} alt="Logo" />
          </span>
        </Link>
      </div>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/eofficer" style={{ textDecoration: "none" }}>
            <li>
              <HomeIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">MANAGE</p>
          <Link to="/eofficer/add" style={{ textDecoration: "none" }}>
            <li>
              <HowToVoteIcon className="icon" />
              <span>Add Candidate</span>
            </li>
          </Link>
          <Link to="/eofficer/List" style={{ textDecoration: "none" }}>
            <li>
              <HowToRegIcon className="icon" />
              <span>Voter List</span>
            </li>
          </Link>
          <Link to="/eofficer/result" style={{ textDecoration: "none" }}>
            <li>
              <EqualizerIcon className="icon" />
              <span>Results</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <LogoutIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;