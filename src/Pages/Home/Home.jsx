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
          <Widget/>
          <Widget/>
          <Widget/>
          <Widget/>
        </div>
      </div>
    </div>
  );
};

export default Home;
