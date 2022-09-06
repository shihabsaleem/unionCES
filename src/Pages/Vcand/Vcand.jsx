import React from "react";
import "./vcand.scss";
import Vsidebar from "../../Component/Vsidebar/Vsidebar";
import Vnavbar from "../../Component/Vnavbar/Vnavbar";
import Ballot from "../../Component/Ballot/Ballot";

const Vcand = () => {
  return (
    <div className="cand">
      <Vsidebar />
      <div className="candContainer">
        <Vnavbar />
        <div className="ballot">
          <Ballot />
        </div>
      </div>
    </div>
  );
};

export default Vcand;
