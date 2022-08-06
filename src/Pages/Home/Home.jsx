import React from "react";
import Navbar from "../../Component/Navbar/Navbar";
import Sidebar from "../../Component/Sidebar/Sidebar";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer"><Navbar/>homecon</div>
    </div>
  );
};

export default Home;
