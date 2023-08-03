import React from "react";
import "./featured.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <div className="title>">Polling</div>
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={80}
            text="80%"
            strokeWidth={6}
            styles={buildStyles({ pathColor: "#ffea8f", textColor: "#555" })}
          />
        </div>
      </div>
    </div>
  );
};

export default Featured;
