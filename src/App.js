import Home from "./Pages/Home/Home"
import Add from "./Pages/Add/Add"
import List from "./Pages/List/List"
import Result from "./Pages/Result/Result"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Vhome from "./Pages/Vhome/Vhome"

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/eofficer">
            <Route index element={<Home />} />
            <Route path="Login" element={<Login/>}/>
            <Route path="Add" element={<Add />}/>
            <Route path="List" element={<List />}/>
            <Route path="Result" element={<Result />}/>
          </Route>
          <Route path="/Voter">
            <Route index element={<Vhome />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
