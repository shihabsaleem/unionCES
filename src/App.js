import Home from "./Component/Home/Home";
import Vote from "./Component/Vote/Vote";
import Profile from "./Component/Profile/Profile";
import Result from "./Component/Result/Result";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Component/Login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="Login" element={<Login/>}/>
            <Route path="/Vote" element={<Vote />}/>
            <Route path="/Profile" element={<Profile />}/>
            <Route path="/Result" element={<Result />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
