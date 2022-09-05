import React from "react";
import "./add.scss";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Navbar from "../../Component/Navbar/Navbar";
import logo from "./logo.svg";

const Add = () => {
  return (
    <div className="add">
      <Sidebar />
      <div className="addContainer">
        <Navbar />
        <div className="top">
          <h1>Candidate Nomination</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={logo} />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label>ID</label>
                <input type="text" placeholder="Admission No" />
              </div>
              <div className="formInput">
                <label>Nominee</label>
                <input type="text" placeholder="Full Name" />
              </div>
              <div className="formInput">
                <label>Department</label>
                <input type="text" placeholder="CS/ME/EE/EC" />
              </div>
              <div className="formInput">
                <label>Semester</label>
                <input type="number" placeholder="2/4/6/8/" />
              </div>
              <div className="formInput">
                <label>Seat</label>
                <input type="text" placeholder="Post" />
              </div>
              <div className="formInput">
                <label>Profile</label>
                <input type="text" placeholder="Bio" />
              </div>
              <button>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
