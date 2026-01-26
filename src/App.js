import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// --- AUTH & SECURITY ---
// --- AUTH & SECURITY ---
import Sample from "./Pages/Login/Sample"; // Login Page
import Signup from "./Pages/Signup/Signup"; // Signup Page
import PrivateRoute from "./Component/PrivateRoute"; // Security Wrapper

// --- MAIN DASHBOARD (New) ---
// Make sure you created this file in src/Pages/Dashboard/Dashboard.js
import Dashboard from "./Pages/Dashboard/Dashboard";

// --- OFFICER PAGES ---
import Home from "./Pages/Home/Home";
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Result from "./Pages/Result/Result";

// --- VOTER PAGES ---
import Vhome from "./Pages/Vhome/Vhome";
import Vcast from "./Pages/Vcast/Vcast";
import Vresult from "./Pages/Vresult/Vresult";
import Vcand from "./Pages/Vcand/Vcand";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* 1. PUBLIC ROUTE: Login Page */}
          <Route path="/" element={<Sample />} />
          <Route path="/signup" element={<Signup />} />

          {/* 2. PROTECTED ROUTE: Main Dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* 3. PROTECTED ROUTES: Election Officer */}
          <Route path="/eofficer">
            <Route
              index
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="Add"
              element={
                <PrivateRoute>
                  <Add />
                </PrivateRoute>
              }
            />
            <Route
              path="List"
              element={
                <PrivateRoute>
                  <List />
                </PrivateRoute>
              }
            />
            <Route
              path="Result"
              element={
                <PrivateRoute>
                  <Result />
                </PrivateRoute>
              }
            />
          </Route>

          {/* 4. PROTECTED ROUTES: Voter */}
          <Route path="/Voter">
            <Route
              index
              element={
                <PrivateRoute>
                  <Vhome />
                </PrivateRoute>
              }
            />
            <Route
              path="cast"
              element={
                <PrivateRoute>
                  <Vcast />
                </PrivateRoute>
              }
            />
            <Route
              path="result"
              element={
                <PrivateRoute>
                  <Vresult />
                </PrivateRoute>
              }
            />
            <Route
              path="voted"
              element={
                <PrivateRoute>
                  <Vcand />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
