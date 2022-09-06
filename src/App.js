import Home from "./Pages/Home/Home";
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Result from "./Pages/Result/Result";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Vcast from "./Pages/Vcast/Vcast";
import Vhome from "./Pages/Vhome/Vhome";
import Vresult from "./Pages/Vresult/Vresult";
import Vcand from "./Pages/Vcand/Vcand";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/eofficer">
            <Route index element={<Home />} />
            <Route path="Login" element={<Login />} />
            <Route path="Add" element={<Add />} />
            <Route path="List" element={<List />} />
            <Route path="Result" element={<Result />} />
          </Route>
          <Route path="/Voter">
            <Route index element={<Vhome />} />
            <Route path="cast" element={<Vcast />} />
            <Route path="result" element={<Vresult />} />
            <Route path="voted" element={<Vcand />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
