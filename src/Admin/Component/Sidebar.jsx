import React from "react";
import { NavLink } from "react-router-dom";
import {
  Settings,
  LayoutDashboard,
  Users,
  FileQuestion,
  BarChart,
  LogOut,
  Book,
  Menu,
  X,
} from "lucide-react";

// The component now accepts 'open', 'toggle', and 'closeOnMobile' as props.
const AdminSidebar = ({ open, toggle, closeOnMobile }) => {
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "Quizzes", icon: FileQuestion, path: "/admin/quizzes" },
    { name: "Analytics", icon: BarChart, path: "/admin/analytics" },
    { name: "Document", icon: Book, path: "/admin/document" },
  ];

  return (
    <>
      {/* 1. Backdrop for mobile view when sidebar is open */}
      {open && window.innerWidth < 1024 && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={toggle}
        ></div>
      )}

      {/* 2. Mobile Toggle Button (placed outside the fixed sidebar) */}
      {window.innerWidth < 1024 && (
        <button
          onClick={toggle}
          className="fixed top-4 left-4 z-40 p-2 bg-indigo-600 rounded-lg text-white shadow-lg"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* 3. The Fixed Sidebar Container */}
      <div
        className={`
          min-h-screen bg-gradient-to-b from-indigo-950 to-indigo-800 text-white flex flex-col shadow-xl fixed top-0 left-0 z-30
          transition-all duration-300 ease-in-out
          ${open ? "w-64" : "w-20"}
          /* Mobile: slide off-screen when closed */
          ${window.innerWidth < 1024 && !open ? "-translate-x-full" : "translate-x-0"}
          lg:translate-x-0 
        `}
      >
        {/* === HEADER === */}
        <div className="flex items-center space-x-3 p-6 border-b border-indigo-700 h-[72px]">
          <Settings size={30} className="text-indigo-300 shrink-0" />
          {/* Hide header text when closed */}
          <h1
            className={`text-2xl font-semibold tracking-wide overflow-hidden ${
              open ? "block" : "hidden"
            } transition-opacity duration-300`}
          >
            Admin Panel
          </h1>
        </div>

        {/* === NAV LINKS === */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map(({ name, icon: Icon, path }) => (
            <NavLink
              key={name}
              to={path}
              onClick={closeOnMobile} // Close on mobile after clicking a link
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 
                ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-indigo-200 hover:bg-indigo-700 hover:text-white"
                }`
              }
            >
              <Icon size={22} className="shrink-0" />
              {/* Hide link text when closed */}
              <span
                className={`font-medium whitespace-nowrap overflow-hidden ${
                  open ? "block" : "hidden"
                }`}
              >
                {name}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* === LOGOUT BUTTON === */}
        <div className="border-t border-indigo-700 p-4 flex justify-center items-center">
          <NavLink
            to="/logout"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-700/40 hover:text-red-200 transition-all duration-200"
          >
            <LogOut size={22} className="shrink-0" />
            {/* Hide logout text when closed */}
            <span
              className={`font-medium whitespace-nowrap overflow-hidden ${
                open ? "block" : "hidden"
              }`}
            >
              Logout
            </span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;