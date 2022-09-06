import React from "react";
import "./vcast.scss";
import Vsidebar from "../../Component/Vsidebar/Vsidebar";
import Vnavbar from "../../Component/Vnavbar/Vnavbar";
import logo from "../../Assets/logo.svg";
import Select from "react-select";

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
  return (
    <div className="cast">
      <Vsidebar />
      <div className="castContainer">
        <Vnavbar />
        <div className="top">
          <h1>Cast the Vote !</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={logo} />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label>Chair</label>
                <Select options={chair} />
              </div>
              <div className="formInput">
                <label>Vice Chair</label>
                <Select options={vchair} />
              </div>
              <div className="formInput">
                <label>Secretary</label>
                <Select options={secr} />
              </div>
              <div className="formInput">
                <label>Lady Rep</label>
                <Select options={ladyrep} />
              </div><div className="formInput">
                <label>Secretary</label>
                <Select options={secr} />
              </div>
              <div className="formInput">
                <label>Lady Rep</label>
                <Select options={ladyrep} />
              </div>
              <button>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vcast;
