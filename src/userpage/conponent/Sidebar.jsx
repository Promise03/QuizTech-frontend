import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, History, Trophy, Settings, LogOut } from 'lucide-react';

const UserSidebar = () => {
  return (
    <div className="w-64 bg-white shadow-lg text-gray-800 flex flex-col p-6">
      <div className="flex items-center space-x-3 mb-10">
        <img src="https://via.placeholder.com/64" alt="User Profile" className="rounded-full w-16 h-16 border-2 border-indigo-600" />
        <div>
          <span className="text-xl font-bold">Welcome, Alex</span>
          <p className="text-sm text-gray-500">Ready for a challenge?</p>
        </div>
      </div>
      <nav className="flex-1 space-y-2">
        <Link to="/userdashboard" className="flex items-center space-x-3 p-3 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors duration-200">
          <LayoutDashboard size={24} />
          <span>Dashboard</span>
        </Link>

          <Link to="/quizzes" className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200">
          <Trophy size={24} />
          <span>Qiuzzes</span>
        </Link>

        <Link to="/history" className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200">
          <History size={24} />
          <span>Quiz History</span>
        </Link>
        <Link to="/achievements" className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200">
          <Trophy size={24} />
          <span>Achievements</span>
        </Link>

        <Link to="/document" className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200">
          <Trophy size={24} />
          <span>Document</span>
        </Link>
        <Link to="/settings" className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200">
          <Settings size={24} />
          <span>Settings</span>
        </Link>
      </nav>
      <div className="mt-auto">
        <Link to="/logout" className="flex items-center space-x-3 p-3 rounded-lg text-red-500 hover:bg-red-100 transition-colors duration-200">
          <LogOut size={24} />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default UserSidebar;