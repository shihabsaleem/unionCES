import React from "react";
import "./sidebar.scss";
import HomeIcon from '@mui/icons-material/Home';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import EqualizerIcon from '@mui/icons-material/Equalizer';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">UNION</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <li><HomeIcon/>
            <span>Dashboard</span>
          </li>
          <li><HowToVoteIcon/>
            <span>Cast Vote</span>
          </li>
          <li><HowToRegIcon/>
            <span>Candidate Profile</span>
          </li>
          <li><EqualizerIcon/>
            <span>Result</span>
          </li>
        </ul>
      </div>
      <div className="bottom">color</div>
    </div>
  );
};

export default Sidebar;
