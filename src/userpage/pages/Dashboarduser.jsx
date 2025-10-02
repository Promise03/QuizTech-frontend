import React from 'react';
import UserHeader from '../conponent/Header.jsx';
import UserSidebar from '../conponent/Sidebar.jsx'

const UserDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <UserSidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <UserHeader title="Dashboard" />
        <div className="p-10">
          {/* Progress and Stats */}
      {/* Progress and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">Quizzes Completed</h3>
            <p className="text-4xl font-bold text-indigo-700">12</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">High Score</h3>
            <p className="text-4xl font-bold text-indigo-700">95%</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">Total Points</h3>
            <p className="text-4xl font-bold text-indigo-700">1,500</p>
          </div>
        </div>

        {/* Recent Quizzes Section */}
        <div className="bg-white p-8 rounded-xl shadow-md mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Recent Quizzes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quiz Card */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-2">HTML Trivia</h4>
              <p className="text-gray-500 mb-4">You scored <span className="text-green-600 font-bold">8/10</span></p>
              <a href="#" className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200">View Details &rarr;</a>
            </div>
            {/* Quiz Card */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-2">JavaScript Trivia</h4>
              <p className="text-gray-500 mb-4">You scored <span className="text-yellow-600 font-bold">6/10</span></p>
              <a href="#" className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200">View Details &rarr;</a>
            </div>
            {/* Quiz Card */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-2">CSS Puzzles</h4>
              <p className="text-gray-500 mb-4">You scored <span className="text-red-600 font-bold">4/10</span></p>
              <a href="#" className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200">View Details &rarr;</a>
            </div>
          </div>
        </div>

        {/* Recommended Quizzes Section */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Recommended for You</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Recommended Quiz Card */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-2">Full stark</h4>
              <p className="text-gray-500 mb-4">Test your knowledge on a wide range of topics.</p>
              <a href="#" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300">Start Quiz</a>
            </div>
            {/* Recommended Quiz Card */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-semibold mb-2">Space Exploration</h4>
              <p className="text-gray-500 mb-4">How much do you know about the cosmos?</p>
              <a href="#" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300">Start Quiz</a>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;


