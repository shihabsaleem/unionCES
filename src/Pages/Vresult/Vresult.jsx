import React from "react";
import "./vresult.scss";
import Vsidebar from "../../Component/Vsidebar/Vsidebar";
import Vnavbar from "../../Component/Vnavbar/Vnavbar";
import Table from "../../Component/Table/Table";

const Vresult = () => {
  return (
    <div className="res">
      <Vsidebar />
      <div className="resContainer">
        <Vnavbar />
        <div className="result">
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Vresult;
