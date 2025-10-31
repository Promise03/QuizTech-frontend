import React from "react";
import { Menu } from "lucide-react";

const AdminHeader = ({ title = "QiuzTech", sidebarOpen, toggleSidebar }) => {
  return (
    <header
      className={`fixed top-0 right-0 bg-white shadow-md flex items-center justify-between px-4 py-4.5 lg:px-8 z-40 transition-all duration-300 ease-in-out
        ${sidebarOpen ? "lg:ml-64 lg:w-[calc(100%-16rem)] ml-0" : "w-full "}
      `}
    >
      {/* === Left: Toggle + Title === */}
      <div className="flex items-center space-x-3">
        {/* Mobile Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 lg:hidden"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
      </div>

      {/* === Right: Profile / Actions === */}
      <div className="hidden lg:flex items-center space-x-4">
        <div className="text-gray-700 font-medium">Admin</div>
      </div>
    </header>
  );
};

export default AdminHeader;
