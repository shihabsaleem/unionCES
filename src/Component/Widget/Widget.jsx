import React from "react";
import "./widget.scss";
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const Widget = () => {
  return (
    <div>
      <div className="widget">
        <div className="left">
          <span className="title">Total Counts</span>
          <span className="counter">500</span>
        </div>
        <div className="right">
          <GroupAddIcon className="icon" />
        </div>
      </div>
    </div>
  );
};

export default Widget;
