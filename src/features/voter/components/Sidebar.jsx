import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import LogoutIcon from "@mui/icons-material/Logout";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Link } from "react-router-dom";
import logo from "../../../Assets/logoh.svg";

const VoterSidebar = () => {
    return (
        <div className="flex-1 min-h-screen bg-white border-r border-gray-200 shadow-[2px_0_20px_rgba(0,0,0,0.02)]">
            {/* Top Logo Section */}
            <div className="h-[60px] flex items-center justify-center border-b border-gray-100">
                <Link to="/voter">
                    <span className="cursor-pointer">
                        <img src={logo} alt="Logo" className="h-[35px] object-contain" />
                    </span>
                </Link>
            </div>

            {/* Center Menu Section */}
            <div className="pl-2.5">
                <ul className="list-none m-0 p-0">

                    <p className="text-[10px] font-extrabold text-gray-400 mt-4 mb-1 ml-2.5 tracking-wide opacity-70">
                        MENU
                    </p>
                    <Link to="/voter" style={{ textDecoration: "none" }}>
                        <li className="flex items-center px-2.5 py-2.5 mr-2.5 cursor-pointer rounded-xl text-gray-700 transition-all duration-200 hover:bg-green-50 group">
                            <HomeIcon className="text-[22px] mr-2.5 text-gray-400 group-hover:text-green-600 transition-colors" />
                            <span className="text-sm font-semibold">Home</span>
                        </li>
                    </Link>

                    <Link to="/voter/cast" style={{ textDecoration: "none" }}>
                        <li className="flex items-center px-2.5 py-2.5 mr-2.5 cursor-pointer rounded-xl text-gray-700 transition-all duration-200 hover:bg-green-50 group">
                            <HowToVoteIcon className="text-[22px] mr-2.5 text-gray-400 group-hover:text-green-600 transition-colors" />
                            <span className="text-sm font-semibold">Vote</span>
                        </li>
                    </Link>

                    <Link to="/voter/voted" style={{ textDecoration: "none" }}>
                        <li className="flex items-center px-2.5 py-2.5 mr-2.5 cursor-pointer rounded-xl text-gray-700 transition-all duration-200 hover:bg-green-50 group">
                            <HowToRegIcon className="text-[22px] mr-2.5 text-gray-400 group-hover:text-green-600 transition-colors" />
                            <span className="text-sm font-semibold">My Ballot</span>
                        </li>
                    </Link>

                    <Link to="/voter/result" style={{ textDecoration: "none" }}>
                        <li className="flex items-center px-2.5 py-2.5 mr-2.5 cursor-pointer rounded-xl text-gray-700 transition-all duration-200 hover:bg-green-50 group">
                            <EqualizerIcon className="text-[22px] mr-2.5 text-gray-400 group-hover:text-green-600 transition-colors" />
                            <span className="text-sm font-semibold">Results</span>
                        </li>
                    </Link>

                    <p className="text-[10px] font-extrabold text-gray-400 mt-4 mb-1 ml-2.5 tracking-wide opacity-70">
                        USER
                    </p>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <li className="flex items-center px-2.5 py-2.5 mr-2.5 cursor-pointer rounded-xl text-gray-700 transition-all duration-200 hover:bg-green-50 group">
                            <LogoutIcon className="text-[22px] mr-2.5 text-gray-400 group-hover:text-green-600 transition-colors" />
                            <span className="text-sm font-semibold">Logout</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default VoterSidebar;
