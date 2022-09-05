import React from 'react'
import './result.scss'
import Sidebar from "../../Component/Sidebar/Sidebar";
import Navbar from "../../Component/Navbar/Navbar";
import Restable from "../../Component/Restable/Restable";

const Result = () => {
  return (
    <div className="result">
      <Sidebar />
      <div className="resultContainer">
        <Navbar />
        <Restable/>
      </div>
    </div>
  )
}

export default Result