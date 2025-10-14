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
} from "lucide-react";

const AdminSidebar = () => {
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "Quizzes", icon: FileQuestion, path: "/admin/quizzes" },
    { name: "Analytics", icon: BarChart, path: "/admin/analytics" },
        { name: "Document", icon: Book, path: "/admin/document" },
  ];

  return (
    <div className="min-h-screen w-64 bg-gradient-to-b from-indigo-950 to-indigo-800 text-white flex flex-col shadow-xl fixed">
      {/* === HEADER === */}
      <div className="flex items-center space-x-3 p-6 border-b border-indigo-700">
        <Settings size={30} className="text-indigo-300" />
        <h1 className="text-2xl font-semibold tracking-wide">Admin Panel</h1>
      </div>

      {/* === NAV LINKS === */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-indigo-200 hover:bg-indigo-700 hover:text-white"
              }`
            }
          >
            <Icon size={22} />
            <span className="font-medium">{name}</span>
          </NavLink>
        ))}
      </nav>

      {/* === LOGOUT BUTTON === */}
      <div className="border-t border-indigo-700 p-4">
        <NavLink
          to="/logout"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-700/40 hover:text-red-200 transition-all duration-200"
        >
          <LogOut size={22} />
          <span className="font-medium">Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
