import React from "react";
import { Menu, Play } from "lucide-react";

const Header = ({ title = "Dashboard", toggleSidebar, sidebarOpen }) => {
  return (
    <header
      className={`fixed top-0 w-full right-0 bg-white shadow-md flex items-center justify-between px-4 py-3 lg:px-6 z-30 transition-all duration-300 ease-in-out 
        ${sidebarOpen ? "lg:ml-64" : "ml-0"}
      `}
    >
      {/* === Left Section: Menu + Title === */}
      <div className="flex items-center space-x-3">
        {/* Mobile Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 lg:hidden"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Page Title with left margin on large screens */}
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 lg:ml-64">
          {title}
        </h1>
      </div>

      {/* === Right Section: Start Quiz Button === */}
      <a
        href="#"
        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
      >
        <Play size={20} className="mr-2" />
        Start a New Quiz
      </a>
    </header>
  );
};

export default Header;
