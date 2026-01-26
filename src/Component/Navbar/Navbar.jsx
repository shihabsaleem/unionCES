import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  return (
    <div className="h-[60px] bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center text-sm text-gray-700 sticky top-0 z-[999]">
      <div className="w-full flex items-center justify-between px-5">

        {/* Search Bar */}
        <div className="flex items-center border border-gray-100 rounded-full px-4 py-2 bg-gray-50/50 transition-all duration-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-accent focus-within:border-transparent">
          <input
            type="text"
            placeholder="Search..."
            className="border-none outline-none bg-transparent text-gray-700 text-sm placeholder-gray-400"
          />
          <SearchIcon className="text-[18px] text-gray-400 cursor-pointer ml-2" />
        </div>

        {/* Right Items */}
        <div className="flex items-center">
          <div className="flex items-center gap-3 cursor-pointer py-1.5 px-3 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <span className="font-semibold text-gray-700">Hi, Admin</span>
            <AccountCircleIcon className="text-[32px] text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;