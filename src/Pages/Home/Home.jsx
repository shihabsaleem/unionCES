import React from "react";
import Navbar from "../../Component/Navbar/Navbar";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Widget from "../../Component/Widget/Widget";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="tcount" />
          <Widget type="tmales" />
          <Widget type="tfemales" />
          <Widget type="tpoll" />
          <Widget type="rvote" />
        </div>
      </div>
    </div>
  );
};

export default Home;
