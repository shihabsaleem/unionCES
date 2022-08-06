import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Component/Login/Login";
import Register from "./Component/Register/Register";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Main</h1>
        <Router><Link to={'/Register'}></Link>
          <Routes>
            <Route exact path="/" element={<Login />} />
          </Routes>
          <Routes>
            <Route exact path="/" element={<Register />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
