import React from "react";
import "./vhome.scss";
import Vsidebar from "../../Component/Vsidebar/Vsidebar";
import Vnavbar from "../../Component/Vnavbar/Vnavbar";
import Featured from "../../Component/Featured/Featured";
import Widget from "../../Component/Widget/Widget";

const Vhome = () => {
  return (
    <div className="home">
      <Vsidebar />
      <div className="homeContainer">
        <Vnavbar />

        {/* <div className="circle"></div> */}
        <div className="widgets">
          <Featured />
          <Widget type="tcount" />

          <Widget type="tpoll" />
          <Widget type="rvote" />
        </div>
      </div>
    </div>
  );
};

export default Vhome;
