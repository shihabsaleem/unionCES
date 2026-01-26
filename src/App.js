import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// --- COMPONENTS ---
import PrivateRoute from "./components/PrivateRoute.js";

// --- FEATURES: AUTH ---
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";

// --- FEATURES: ADMIN (ELECTION OFFICER) ---
import AdminDashboard from "./features/admin/pages/Dashboard";
import AdminAddCandidate from "./features/admin/pages/AddCandidate";
import AdminVoterList from "./features/admin/pages/VoterList";
import AdminResults from "./features/admin/pages/Results";

// --- FEATURES: VOTER ---
import VoterDashboard from "./features/voter/pages/Dashboard";
import VoterCast from "./features/voter/pages/CastVote";
import VoterResults from "./features/voter/pages/Results";
import VoterMyBallot from "./features/voter/pages/MyBallot";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* 1. PUBLIC ROUTE: Login Page */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 3. PROTECTED ROUTES: Election Officer */}
          <Route path="/eofficer">
            <Route index element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
            <Route path="Add" element={<PrivateRoute><AdminAddCandidate /></PrivateRoute>} />
            <Route path="List" element={<PrivateRoute><AdminVoterList /></PrivateRoute>} />
            <Route path="Result" element={<PrivateRoute><AdminResults /></PrivateRoute>} />
          </Route>

          {/* 4. PROTECTED ROUTES: Voter */}
          <Route path="/Voter">
            <Route index element={<PrivateRoute><VoterDashboard /></PrivateRoute>} />
            <Route path="cast" element={<PrivateRoute><VoterCast /></PrivateRoute>} />
            <Route path="result" element={<PrivateRoute><VoterResults /></PrivateRoute>} />
            <Route path="voted" element={<PrivateRoute><VoterMyBallot /></PrivateRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
