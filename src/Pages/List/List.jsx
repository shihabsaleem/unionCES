import React from "react";
import "./list.scss";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Navbar from "../../Component/Navbar/Navbar";
import Datatable from "../../Component/Datatable/Datatable";

const List = () => {
  return (
    <div className="List">
      <Sidebar />
      <div className="ListContainer">
        <Navbar />

        <Datatable />
      </div>
    </div>
  );
};

export default List;
