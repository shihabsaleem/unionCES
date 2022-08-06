import React from "react";
import "./widget.scss";
import AppsIcon from '@mui/icons-material/Apps';

const Widget = () => {
  return (
    <div>
      <div className="widget">
        <div className="left">  <span className="title">Total Counts</span>
          <span className="counter">500</span>
        
        </div>
        <div className="right"><AppsIcon/> right</div>
      </div>
    </div>
  );
};

export default Widget;
