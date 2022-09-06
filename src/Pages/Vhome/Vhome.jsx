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
        <h1>Happy Voting.</h1>
        <div className="circle">
          <Featured />
        </div>
        <div className="widgets">
          <Widget type="tcount" />

          <Widget type="tpoll" />
          <Widget type="rvote" />
        </div>
      </div>
    </div>
  );
};

export default Vhome;
