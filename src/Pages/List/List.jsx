import React from "react";
import "./list.scss";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Navbar from "../../Component/Navbar/Navbar";
import Table from "../../Component/Table/Table";

const List = () => {
  return (
    <div className="List">
      <Sidebar />
      <div className="ListContainer">
        <Navbar />

        
      </div>
    </div>
  );
};

export default List;
