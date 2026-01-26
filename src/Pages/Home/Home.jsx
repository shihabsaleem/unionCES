import React from "react";
import Navbar from "../../Component/Navbar/Navbar";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Widget from "../../Component/Widget/Widget";
import Featured from "../../Component/Featured/Featured";
import Chart from "../../Component/Chart/Chart";
import Table from "../../Component/Table/Table";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        
        <div className="contentWrapper">
          {/* Section 1: Key Metrics (Widgets) - Moved to top for immediate visibility */}
          <div className="widgets">
            <Widget type="tcount" />
            <Widget type="tmales" />
            <Widget type="tfemales" />
            <Widget type="tpoll" />
            <Widget type="rvote" />
          </div>

          {/* Section 2: Data Visualization (Charts) */}
          <div className="charts">
            <Featured />
            <Chart />
          </div>

          {/* Section 3: Detailed Data (Table) */}
          <div className="listContainer">
            <div className="listTitle">Recent Poll Results</div>
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;