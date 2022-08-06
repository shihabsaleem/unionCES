import React from "react";
import "./widget.scss";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

const Widget = ({ type }) => {
  let data;
  switch (type) {
    case "Tcount":
      data = {
        title: "Total Counts",
        counter: "500",
        icon: <GroupAddIcon className="icon" />,
      };
      break;

    case "Tmales":
      data = {
        title: "Total Males",
        counter: "350",
        icon: <GroupAddIcon className="icon" />,
      };
      break;

    case "Tfemales":
      data = {
        title: "Total Females",
        counter: "150",
        icon: <GroupAddIcon className="icon" />,
      };
      break;

    case "Tpoll":
      data = {
        title: "Total Poll",
        counter: "450",
        icon: <GroupAddIcon className="icon" />,
      };
      break;
    case "Rvote":
      data = {
        title: "Remaining Vote",
        counter: "50",
        icon: <GroupAddIcon className="icon" />,
      };
      break;

    default:
      break;
  }

  return (
    <div>
      <div className="widget">
        <div className="left">
          <span className="title">{data.title}</span>
          <span className="counter">{data.count}</span>
        </div>
        <div className="right">{data.icon}</div>
      </div>
    </div>
  );
};

export default Widget;
