import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  History,
  Trophy,
  FileText,
  Settings,
  LogOut,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/Slice/LoginSlice';

const UserSidebar = () => {
  // Define link style based on whether it's active
  const linkClasses = ({ isActive }) =>
    `flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-indigo-600 text-white shadow-md'
        : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-700'
    }`;

    // logout
    const dispatch = useDispatch()
    const navigate = useNavigate

    const handleLogout = () => {
      dispatch(logout());
      navigate("/login")
    }

  return (
    <div className="w-64 bg-white shadow-lg text-gray-800 flex flex-col p-6 min-h-screen fixed top-0">
      {/* === User Profile Section === */}
      <div className="flex items-center space-x-3 mb-10">
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
        <NavLink to="/user" end className={linkClasses}>
          <LayoutDashboard size={24} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/user/quizzes" className={linkClasses}>
          <Trophy size={24} />
          <span>Quizzes</span>
        </NavLink>

        <NavLink to="/user/history" className={linkClasses}>
          <History size={24} />
          <span>Quiz History</span>
        </NavLink>

        <NavLink to="/user/achievements" className={linkClasses}>
          <Trophy size={24} />
          <span>Achievements</span>
        </NavLink>

        <NavLink to="/user/document" className={linkClasses}>
          <FileText size={24} />
          <span>Documents</span>
        </NavLink>

        <NavLink to="/user/settings" className={linkClasses}>
          <Settings size={24} />
          <span>Settings</span>
        </NavLink>
      </nav>

      {/* === Logout === */}
      <div className="mt-auto">
        <NavLink
          to="/login" 
          onClick={handleLogout}
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
              isActive
                ? 'bg-red-500 text-white'
                : 'text-red-500 hover:bg-red-100'
            }`
          }
        >
          <LogOut size={24} />
          <span>Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default UserSidebar;
