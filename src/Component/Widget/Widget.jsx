import React from "react";
import "./widget.scss";
// ... icons imports remain the same
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import BallotIcon from '@mui/icons-material/Ballot';

const Widget = ({ type }) => {
  // ... switch case logic remains the same ... 
  // (Copy your existing switch case logic here)
  let data;
  switch (type) {
      case "tcount":
          data = { title: "Total Counts", counter: "500", icon: <GroupAddIcon className="icon" style={{color: "crimson", backgroundColor: "rgba(255, 0, 0, 0.2)"}}/> };
          break;
      case "tmales":
          data = { title: "Males", counter: "350", icon: <MaleIcon className="icon" style={{color: "goldenrod", backgroundColor: "rgba(218, 165, 32, 0.2)"}}/> };
          break;
      case "tfemales":
          data = { title: "Females", counter: "150", icon: <FemaleIcon className="icon" style={{color: "green", backgroundColor: "rgba(0, 128, 0, 0.2)"}}/> };
          break;
      // ... etc
      default:
         data = { title: "Unknown", counter: "0", icon: <BallotIcon className="icon"/> };
         break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.counter}</span>
        <span className="link">See details</span>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;