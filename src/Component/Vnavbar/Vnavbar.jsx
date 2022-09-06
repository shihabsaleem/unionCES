import React from "react";
import "./Vnavbar.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Vnavbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            Hi, Voter <AccountCircleIcon className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vnavbar;
