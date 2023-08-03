import React from "react";
import "./widget.scss";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import BallotIcon from '@mui/icons-material/Ballot';

const Widget = ({ type }) => {
  let data;
  switch (type) {
    case "tcount":
      data = {
        title: "Total Counts",
        counter: "500",
        icon: <GroupAddIcon className="icon" />,
      };
      break;

    case "tmales":
      data = {
        title: "Total Males",
        counter: "350",
        icon: <MaleIcon className="icon" />,
      };
      break;

    case "tfemales":
      data = {
        title: "Total Females",
        counter: "150",
        icon: <FemaleIcon className="icon" />,
      };
      break;

    case "tpoll":
      data = {
        title: "Total Poll",
        counter: "450",
        icon: <BallotIcon className="icon" />,
      };
      break;
    case "rvote":
      data = {
        title: "Remaining Vote",
        counter: "50",
        icon: <GroupRemoveIcon className="icon" />,
      };
      break;

    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.counter}</span>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widget;
