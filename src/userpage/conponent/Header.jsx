import React from 'react';
import { Play } from 'lucide-react';

const Header = ({ title = "Dashboard" }) => {
  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-md">
      <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
      <a href="#" className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300">
        <Play size={20} className="mr-2"/>
        Start a New Quiz
      </a>
    </header>
  );
};

export default Header;