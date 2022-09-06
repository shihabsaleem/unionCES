import React from "react";
import "./vresult.scss";
import Vsidebar from "../../Component/Vsidebar/Vsidebar";
import Vnavbar from "../../Component/Vnavbar/Vnavbar";

const Vres = () => {
  return (
    <div className="res">
      <Vsidebar />
      <div className="resContainer">
        <Vnavbar />
        Result
      </div>
    </div>
  );
};

export default Vres;
