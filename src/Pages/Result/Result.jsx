import React from 'react'
import './result.scss'
import Sidebar from "../../Component/Sidebar/Sidebar";
import Navbar from "../../Component/Navbar/Navbar";
import Datatable from "../../Component/Datatable/Datatable";

const Result = () => {
  return (
    <div className="result">
      <Sidebar />
      <div className="resultContainer">
        <Navbar />
      </div>
    </div>
  )
}

export default Result