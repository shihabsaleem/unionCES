import React from "react";
import "./vhome.scss";
import Vsidebar from "../../Component/Vsidebar/Vsidebar";
import Vnavbar from "../../Component/Vnavbar/Vnavbar";

const Vhome = () => {
  return (
    <div className="cast">
      <Vsidebar />
      <div className="castContainer">
        <Vnavbar />Home
      </div>
    </div>
  );
};

export default Vhome;
