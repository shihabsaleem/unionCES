import React from "react";
import "./add.scss";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Navbar from "../../Component/Navbar/Navbar";
import logo from "../../Assets/logo.svg";
import { useState } from "react";
import axios from "axios";

const Add = () => {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [dept, setDept] = useState();
  const [sem, setSem] = useState();
  const [seat, setSeat] = useState();
  const handleSubmit = () => {
    axios
      .post("http://localhost:8000/api/addcandidate", {
        headers: { "content-type": "application/x-www-form-urlencoded" },
        admission: id,
        dept: dept,
        seat: seat,
        name: name,
        semester: sem,
      })
      .then((e) => alert("Added"));
  };
  return (
    <div className="add">
      <Sidebar />
      <div className="addContainer">
        <Navbar />
        <div className="top">
          <div>Candidate Nomination</div>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={logo} />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label>ID</label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="Admission No"
                />
              </div>
              <div className="formInput">
                <label>Nominee</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                />
              </div>
              <div className="formInput">
                <label>Department</label>
                <input
                  type="text"
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  placeholder="CS/ME/EE/EC"
                />
              </div>
              <div className="formInput">
                <label>Semester</label>
                <input
                  type="number"
                  value={sem}
                  onChange={(e) => setSem(e.target.value)}
                  placeholder="2/4/6/8/"
                />
              </div>
              <div className="formInput">
                <label>Seat</label>
                <input
                  type="text"
                  value={seat}
                  onChange={(e) => setSeat(e.target.value)}
                  placeholder="Post"
                />
              </div>
              <button onClick={handleSubmit}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
