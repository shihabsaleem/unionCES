import React, { useEffect, useState } from "react";
import "./vcast.scss";
import Vsidebar from "../../Component/Vsidebar/Vsidebar";
import Vnavbar from "../../Component/Vnavbar/Vnavbar";
import logo from "../../Assets/logo.svg";
import Select from "react-select";
import { authFetch } from "../../utils/api"; // Import the helper

const Vcast = () => {
  const [data, setData] = useState(null);
  const [chair, setChair] = useState("0");
  const [vchair, setVchair] = useState("1");
  const [ladyrep, setLadyrep] = useState("2");
  const [secretery, setSecretery] = useState("3");

  // Fetch Candidates on load
  useEffect(() => {
    const getCandidates = async () => {
      try {
        const response = await authFetch(
          "http://localhost:8000/api/votecandidates",
        );
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };
    getCandidates();
  }, []);

  // Handle Vote Submission
  const handleSubmit = async () => {
    try {
      const response = await authFetch("http://localhost:8000/api/castvote", {
        method: "POST",
        body: JSON.stringify({
          chair: chair,
          vchair: vchair,
          secr: secretery,
          ladyrep: ladyrep,
        }),
      });

      if (response.ok) {
        // Redirect to result page on success
        window.location.href = "/Voter/result";
      } else {
        alert("Voting failed. Please try again.");
      }
    } catch (error) {
      console.error("Error casting vote:", error);
    }
  };

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
            <img src={logo} alt="logo" />
          </div>
          <div className="right">
            {data ? (
              <form>
                <div className="formInput">
                  <label>Chair</label>
                  <Select
                    options={data.chair}
                    onChange={(e) => setChair(e.value)}
                    defaultValue={{ value: "0", label: "NOTA" }}
                  />
                </div>
                <div className="formInput">
                  <label>Vice Chair</label>
                  <Select
                    options={data.vchair}
                    onChange={(e) => setVchair(e.value)}
                    defaultValue={{ value: "1", label: "NOTA" }}
                  />
                </div>
                <div className="formInput">
                  <label>Secretary</label>
                  <Select
                    options={data.secr}
                    onChange={(e) => setSecretery(e.value)}
                    defaultValue={{ value: "2", label: "NOTA" }}
                  />
                </div>
                <div className="formInput">
                  <label>Lady Rep</label>
                  <Select
                    options={data.ladyrep}
                    onChange={(e) => setLadyrep(e.value)}
                    defaultValue={{ value: "3", label: "NOTA" }}
                  />
                </div>
                <button type="button" onClick={handleSubmit}>
                  Submit
                </button>
              </form>
            ) : (
              <p>Loading Candidates...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vcast;
