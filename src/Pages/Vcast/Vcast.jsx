import React from "react";
import "./vcast.scss";
import Vsidebar from "../../Component/Vsidebar/Vsidebar";
import Vnavbar from "../../Component/Vnavbar/Vnavbar";
import logo from "../../Assets/logo.svg";
import Select from "react-select";
import { useEffect, useState } from "react";
import axios from "axios";

const chair = [
  { value: "2020101", label: "Joe Deo" },
  { value: "2020132", label: "John Doe" },
  { value: "nota", label: "NOTA" },
];
const vchair = [
  { value: "2020001", label: "Joe Deo" },
  { value: "2020122", label: "John Doe" },
  { value: "nota", label: "NOTA" },
];
const secr = [
  { value: "2020101", label: "Joe Deo" },
  { value: "2020112", label: "John Doe" },
  { value: "nota", label: "NOTA" },
];
const ladyrep = [
  { value: "2020111", label: "Deo" },
  { value: "2020202", label: "Doe" },
  { value: "nota", label: "NOTA" },
];

const Vcast = () => {
  const [data, setData] = useState()
  const [chair, setChair] = useState("0")
  const [vchair, setVchair] = useState("1")
  const [ladyrep, setLadyrep] = useState("2")
  const [secretery, setSecretery] = useState("3")
  useEffect(()=>{
    axios.get("http://localhost:8000/api/votecandidates")
    .then(e=>setData(e.data))
  },[])
  const handleSubmit = ()=>{
    axios.post("http://localhost:8000/api/castvote",{
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
        chair:chair,
        vchair:vchair,
        secr:secretery,
        ladyrep:ladyrep
      }).then(e=>window.location.href = "/voter/result")
  }
  return (
    <div className="cast">
      <Vsidebar />
      <div className="castContainer">
        <Vnavbar />
        <div className="top">
        <div>Cast the Vote</div>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={logo} />
          </div>
          <div className="right">
          {data && <form>
              <div className="formInput">
                <label>Chair</label>
                <Select options={data.chair} onChange={e=>setChair(e.value)} defaultValue={{ value: "0", label: "NOTA" }}/>
              </div>
              <div className="formInput">
                <label>Vice Chair</label>
                <Select onChange={e=>setVchair(e.value)} defaultValue={{ value: "1", label: "NOTA" }} options={data.vchair} />
              </div>
              <div className="formInput">
                <label>Secretary</label>
                <Select onChange={e=>setSecretery(e.value)} defaultValue={{ value: "2", label: "NOTA" }} options={data.secr} />
              </div>
              <div className="formInput">
                <label>Lady Rep</label>
                <Select onChange={e=>setLadyrep(e.value)} defaultValue={{ value: "3", label: "NOTA" }} options={data.ladyrep}  />
              </div>
              <button type="button" onClick={handleSubmit}>Submit</button>
            </form>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vcast;
