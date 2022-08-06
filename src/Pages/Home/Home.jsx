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
          <Widget type="Tcount" />
          <Widget type="Tmales" />
          <Widget type="Tfemales" />
          <Widget type="Tpoll " />
          <Widget type="Rvote " />
        </div>
      </div>
    </div>
  );
};

export default Home;
