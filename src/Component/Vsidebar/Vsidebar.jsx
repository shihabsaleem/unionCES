import React from "react";
import "./Vsidebar.scss";
import HomeIcon from "@mui/icons-material/Home";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

const Vsidebar = () => {
  return (
    <div className="Vsidebar">
      <div className="top">
        <Link to="/voter" style={{ textDecoration: "none" }}>
          <span className="logo">UNION</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Link to="/voter" style={{ textDecoration: "none" }}>
            <li>
              <HomeIcon className="icon" />
              <span>Candidate</span>
            </li>
          </Link>
          <Link to="/voter/cast" style={{ textDecoration: "none" }}>
            <li>
              <HowToVoteIcon className="icon" />
              <span>Cast Vote</span>
            </li>
          </Link>

          <Link to="/result" style={{ textDecoration: "none" }}>
            <li>
              <EqualizerIcon className="icon" />
              <span>Result</span>
            </li>
          </Link>
          <Link to="/user/logout" style={{ textDecoration: "none" }}>
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

export default Vsidebar;
