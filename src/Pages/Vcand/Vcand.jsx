import React from "react";
import "./vcand.scss";
import Vsidebar from "../../Component/Vsidebar/Vsidebar";
import Vnavbar from "../../Component/Vnavbar/Vnavbar";

const Vcand = () => {
  return (
    <div className="cand">
      <Vsidebar />
      <div className="candContainer">
        <Vnavbar />
        Cand
      </div>
    </div>
  );
};

export default Vcand;
