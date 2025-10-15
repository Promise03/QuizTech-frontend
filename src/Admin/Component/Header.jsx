import React from 'react';
import { Settings } from 'lucide-react';

const AdminHeader = ({ title = "Dashboard" }) => {
  return (
    <header className="flex justify-between items-center p-6 bg-white fixed w-full top-0 z-50 ">
      <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
      {/* <div className="flex items-center space-x-4">
        <span className="text-gray-600">Welcome, Admin</span>
        <img src="https://via.placeholder.com/40" alt="Admin Profile" className="rounded-full"/>
      </div> */}
    </header>
  );
};

export default AdminHeader;