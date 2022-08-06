import React from "react";
import "./sidebar.scss";
import HomeIcon from "@mui/icons-material/Home";

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
          <li>
            <span>Cast Vote</span>
          </li>
          <li>
            <span>Candidate Profile</span>
          </li>
          <li>
            <span>Result</span>
          </li>
        </ul>
      </div>
      <div className="bottom">color</div>
    </div>
  );
};

export default Sidebar;
