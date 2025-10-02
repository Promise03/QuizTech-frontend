import React from 'react';
import { Trophy } from 'lucide-react';
import Header from '../conponent/Header';
import UserSidebar from '../conponent/Sidebar';

const QuizzesPage = () => {
  return (
   <div className='flex'>
    
    <UserSidebar/>
     <div className="flex-1 flex flex-col overflow-auto">
      <Header/>
      <div className='p-10'>
      <header className="flex items-center space-x-3 mb-6">
        <Trophy size={32} className="text-yellow-500" />
        <h1 className="text-3xl font-bold text-gray-900">Quizzes</h1>
      </header>
      <p className="text-gray-700 mb-6">
        Choose a quiz to test your knowledge and challenge yourself!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((quiz) => (
          <div key={quiz} className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">Quiz #{quiz}</h2>
            <p className="text-gray-600">Test your skills on topic #{quiz}.</p>
            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
              Start Quiz
            </button>
          </div>
        ))}
      </div>
      </div>
      
    </div>
   </div>
  );
};

export default QuizzesPage;