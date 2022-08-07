import React from "react";
import "./featured.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h3 className="title>">Polling</h3>
      </div>
      <div className="bottom">
        <div className="featureChart">
          <CircularProgressbar value={80} text="80%" strokeWidth={5} />
        </div>
      </div>
    </div>
  );
};

export default Featured;
