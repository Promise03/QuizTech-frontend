import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  History,
  Trophy,
  FileText,
  Settings,
  LogOut,
  X
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/Slice/LoginSlice';

const UserSidebar = ({ open, toggle, closeOnMobile }) => {
  const linkClasses = ({ isActive }) =>
    `flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-indigo-600 text-white shadow-md'
        : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-700'
    }`;

  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ FIXED: added parentheses

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      {/* === Overlay for mobile === */}
      {open && (
        <div
          className="fixed inset-0  bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={closeOnMobile}
        ></div>
      )}

      {/* === Sidebar === */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg text-gray-800 flex flex-col p-6 z-50 transform transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0
      `}
      >
        {/* === Close button (mobile only) === */}
        <button
          onClick={toggle}
          className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-200 lg:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* === User Profile Section === */}
        <div className="flex items-center space-x-3 mb-10 mt-8">
          <img
            src="https://via.placeholder.com/64"
            alt="User Profile"
            className="rounded-full w-16 h-16 border-2 border-indigo-600"
          />
          <div>
            <span className="text-xl font-bold">Welcome, Alex</span>
            <p className="text-sm text-gray-500">Ready for a challenge?</p>
          </div>
        </div>

        {/* === Navigation Links === */}
        <nav className="flex-1 space-y-2">
          <NavLink to="/user" end className={linkClasses} onClick={closeOnMobile}>
            <LayoutDashboard size={24} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/user/quizzes" className={linkClasses} onClick={closeOnMobile}>
            <Trophy size={24} />
            <span>Quizzes</span>
          </NavLink>

          <NavLink to="/user/history" className={linkClasses} onClick={closeOnMobile}>
            <History size={24} />
            <span>Quiz History</span>
          </NavLink>

          <NavLink to="/user/achievements" className={linkClasses} onClick={closeOnMobile}>
            <Trophy size={24} />
            <span>Achievements</span>
          </NavLink>

          <NavLink to="/user/document" className={linkClasses} onClick={closeOnMobile}>
            <FileText size={24} />
            <span>Documents</span>
          </NavLink>

          <NavLink to="/user/settings" className={linkClasses} onClick={closeOnMobile}>
            <Settings size={24} />
            <span>Settings</span>
          </NavLink>
        </nav>

        {/* === Logout === */}
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 text-red-500 hover:bg-red-100 w-full"
          >
            <LogOut size={24} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default UserSidebar;
