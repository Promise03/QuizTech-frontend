import React from 'react';
import { History } from 'lucide-react';
import Header from '../conponent/Header';
import UserSidebar from '../conponent/Sidebar';

const QuizHistoryPage = () => {
  const history = [
    { id: 1, title: 'Quiz #1', score: 85, date: '2024-06-01' },
    { id: 2, title: 'Quiz #2', score: 92, date: '2024-06-05' },
    { id: 3, title: 'Quiz #3', score: 78, date: '2024-06-10' },
  ];

  return (
    <div className='flex'>
      
      <UserSidebar/>
      <div className="flex-1 flex flex-col overflow-auto">
      <Header/>
     <div className='p-10'>
       <header className="flex items-center space-x-3 mb-6">
        <History size={32} className="text-green-600" />
        <h1 className="text-3xl font-bold text-gray-900">Quiz History</h1>
      </header>
      {history.length === 0 ? (
        <p className="text-gray-700">You have not taken any quizzes yet.</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2 px-4">Quiz</th>
              <th className="py-2 px-4">Score</th>
              <th className="py-2 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map(({ id, title, score, date }) => (
              <tr key={id} className="hover:bg-gray-50">
                <td className="py-2 px-4">{title}</td>
                <td className="py-2 px-4">{score}%</td>
                <td className="py-2 px-4">{date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
     </div>
    </div>
    </div>
  );
};

export default QuizHistoryPage;