import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, LayoutDashboard, Users, FileQuestion, BarChart, LogOut } from 'lucide-react';

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-indigo-900 text-white flex flex-col p-6">
      <div className="flex items-center space-x-3 mb-10">
        <Settings size={32} />
        <span className="text-2xl font-bold">Admin Panel</span>
      </div>
      <nav className="flex-1 space-y-2">
        <Link to="/admin" className="flex items-center space-x-3 p-3 rounded-lg bg-indigo-800 text-white hover:bg-indigo-700 transition-colors duration-200">
          <LayoutDashboard size={24} />
          <span>Dashboard</span>
        </Link>
        <Link to="/admin/users" className="flex items-center space-x-3 p-3 rounded-lg text-indigo-200 hover:bg-indigo-800 transition-colors duration-200">
          <Users size={24} />
          <span>Users</span>
        </Link>
        <Link to="/admin/quizzes" className="flex items-center space-x-3 p-3 rounded-lg text-indigo-200 hover:bg-indigo-800 transition-colors duration-200">
          <FileQuestion size={24} />
          <span>Quizzes</span>
        </Link>
        <Link to="/admin/analytics" className="flex items-center space-x-3 p-3 rounded-lg text-indigo-200 hover:bg-indigo-800 transition-colors duration-200">
          <BarChart size={24} />
          <span>Analytics</span>
        </Link>
      </nav>
      <div className="mt-auto">
        <Link to="/logout" className="flex items-center space-x-3 p-3 rounded-lg text-red-300 hover:bg-red-800 transition-colors duration-200">
          <LogOut size={24} />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;