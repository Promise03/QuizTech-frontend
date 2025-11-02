import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Settings,
  LayoutDashboard,
  Users,
  FileQuestion,
  BarChart,
  LogOut,
  Book,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/Slice/LoginSlice";

const AdminSidebar = ({ open, toggle, closeOnMobile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // ✅ State for logout confirmation modal
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "Quizzes", icon: FileQuestion, path: "/admin/quizzes" },
    { name: "Analytics", icon: BarChart, path: "/admin/analytics" },
    { name: "Document", icon: Book, path: "/admin/document" },
  ];

  // ✅ Actual logout after confirmation
  const handleLogoutConfirm = () => {
    dispatch(logout());
    closeOnMobile();
    navigate("/login");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && open && (
        <div className="fixed inset-0 bg-black/50 z-20" onClick={toggle}></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-indigo-950 to-indigo-800 text-white shadow-xl z-30 flex flex-col transition-all duration-300 ease-in-out
          ${open ? "w-64" : "w-20"}
          ${isMobile ? (open ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
        `}
      >
        <div className="flex items-center space-x-3 p-6 border-b border-indigo-700 h-[72px]">
          <Settings size={30} className="text-indigo-300 shrink-0" />
          <h1
            className={`text-2xl font-semibold tracking-wide overflow-hidden transition-all duration-300 ${
              open ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            Admin Panel
          </h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map(({ name, icon: Icon, path }) => (
            <NavLink
              key={name}
              to={path}
              onClick={closeOnMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-indigo-200 hover:bg-indigo-700 hover:text-white"
                }`
              }
            >
              <Icon size={22} />
              <span
                className={`font-medium whitespace-nowrap overflow-hidden ${
                  open ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                {name}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-indigo-700 p-4">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-700/40 hover:text-red-200 transition-all duration-200 w-full justify-center"
          >
            <LogOut size={22} />
            <span
              className={`font-medium whitespace-nowrap overflow-hidden ${
                open ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* === Logout Confirmation Modal === */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[999]">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-sm text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
