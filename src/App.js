import Home from "./Pages/Home/Home"
import Add from "./Pages/Add/Add"
import List from "./Pages/List/List"
import Result from "./Pages/Result/Result"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="Login" element={<Login/>}/>
            <Route path="Admin/Add" element={<Add />}/>
            <Route path="Admin/List" element={<List />}/>
            <Route path="Admin/Result" element={<Result />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
