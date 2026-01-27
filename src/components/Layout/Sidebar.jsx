import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation } from "react-router-dom";
import logo from "../../Assets/logoh.svg";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="w-64 hidden md:block min-h-screen bg-white border-r border-gray-200 shadow-[2px_0_20px_rgba(0,0,0,0.02)] flex-shrink-0">
      {/* Top Logo Section */}
      <div className="h-[60px] flex items-center justify-center border-b border-gray-100">
        <Link to="/eofficer">
          <span className="cursor-pointer">
            <img src={logo} alt="Logo" className="h-[35px] object-contain" />
          </span>
        </Link>
      </div>

      {/* Center Menu Section */}
      <div className="pl-2.5">
        <ul className="list-none m-0 p-0">

          <p className="text-[10px] font-bold text-gray-400 mt-4 mb-1 ml-2.5 tracking-wide opacity-70">
            MAIN
          </p>
          <Link to="/eofficer" style={{ textDecoration: "none" }}>
            <li className={`flex items-center px-2.5 py-2.5 mr-2.5 cursor-pointer rounded-xl transition-all duration-200 group ${location.pathname === '/eofficer' ? 'bg-accent/15 text-amber-900 border-l-4 border-amber-600' : 'text-gray-700 hover:bg-accent/15'}`}>
              <HomeIcon className={`text-[22px] mr-2.5 transition-colors ${location.pathname === '/eofficer' ? 'text-amber-600' : 'text-gray-400 group-hover:text-amber-600'}`} />
              <span className={`text-sm font-semibold ${location.pathname === '/eofficer' ? 'font-bold' : ''}`}>Dashboard</span>
            </li>
          </Link>

          <p className="text-[10px] font-bold text-gray-400 mt-4 mb-1 ml-2.5 tracking-wide opacity-70">
            MANAGE
          </p>
          <Link to="/eofficer/add" style={{ textDecoration: "none" }}>
            <li className={`flex items-center px-2.5 py-2.5 mr-2.5 cursor-pointer rounded-xl transition-all duration-200 group ${location.pathname === '/eofficer/add' ? 'bg-accent/15 text-amber-900 border-l-4 border-amber-600' : 'text-gray-700 hover:bg-accent/15'}`}>
              <HowToVoteIcon className={`text-[22px] mr-2.5 transition-colors ${location.pathname === '/eofficer/add' ? 'text-amber-600' : 'text-gray-400 group-hover:text-amber-600'}`} />
              <span className={`text-sm font-semibold ${location.pathname === '/eofficer/add' ? 'font-bold' : ''}`}>Candidates</span>
            </li>
          </Link>

          <Link to="/eofficer/Voters" className={`flex items-center gap-2.5 px-3.5 py-2.5 mr-2.5 rounded-xl transition-all ${location.pathname === '/eofficer/Voters' ? 'bg-accent/15 text-amber-900 font-bold border-l-4 border-amber-600' : 'text-gray-700 hover:bg-accent/15'}`}>
            <svg className={`w-[22px] h-[22px] transition-colors ${location.pathname === '/eofficer/Voters' ? 'text-amber-600' : 'text-gray-400 group-hover:text-amber-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            <span className="text-sm font-semibold">Voter Registry</span>
          </Link>

          <Link to="/eofficer/result" className={`flex items-center gap-2.5 px-3.5 py-2.5 mr-2.5 rounded-xl transition-all ${location.pathname === '/eofficer/result' ? 'bg-accent/15 text-amber-900 font-bold border-l-4 border-amber-600' : 'text-gray-700 hover:bg-accent/15'}`}>
            <svg className={`w-[22px] h-[22px] transition-colors ${location.pathname === '/eofficer/result' ? 'text-amber-600' : 'text-gray-400 group-hover:text-amber-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            <span className="text-sm font-semibold">Results</span>
          </Link>

          <p className="text-[10px] font-bold text-gray-400 mt-4 mb-1 ml-2.5 tracking-wide opacity-70">
            USER
          </p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li className="flex items-center px-2.5 py-2.5 mr-2.5 cursor-pointer rounded-xl text-gray-700 transition-all duration-200 hover:bg-accent/15 group">
              <LogoutIcon className="text-[22px] mr-2.5 text-gray-400 group-hover:text-amber-600 transition-colors" />
              <span className="text-sm font-semibold">Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;