import React, { useState } from "react";
import "./add.scss";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Navbar from "../../Component/Navbar/Navbar";
import logo from "../../Assets/logo.svg";
import { authFetch } from "../../utils/api"; // Import the helper

const Add = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [sem, setSem] = useState("");
  const [seat, setSeat] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await authFetch("http://localhost:8000/api/addcandidate", {
        method: "POST",
        body: JSON.stringify({
          admission: id,
          dept: dept,
          seat: seat,
          name: name,
          semester: sem,
        }),
      });

      if (response.ok) {
        alert("Candidate Added Successfully!");
        // Optional: clear form
        setId(""); setName(""); setDept(""); setSem(""); setSeat("");
      } else {
        alert("Failed to add candidate. Please try again.");
      }
    } catch (error) {
      console.error("Error adding candidate:", error);
    }
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
            <img src={logo} alt="logo" />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}> {/* Use onSubmit here */}
              <div className="formInput">
                <label>ID</label>
                <input
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="Admission No"
                  required
                />
              </div>
              <div className="formInput">
                <label>Nominee</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="formInput">
                <label>Department</label>
                <input
                  type="text"
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  placeholder="CS/ME/EE/EC"
                  required
                />
              </div>
              <div className="formInput">
                <label>Semester</label>
                <input
                  type="number"
                  value={sem}
                  onChange={(e) => setSem(e.target.value)}
                  placeholder="2/4/6/8"
                  required
                />
              </div>
              <div className="formInput">
                <label>Seat</label>
                <input
                  type="text"
                  value={seat}
                  onChange={(e) => setSeat(e.target.value)}
                  placeholder="Post"
                  required
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;