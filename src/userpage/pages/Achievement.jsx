import React from 'react';
import { Trophy } from 'lucide-react';
import Header from '../conponent/Header';
import UserSidebar from '../conponent/Sidebar';

const AchievementsPage = () => {
  const achievements = [
    { id: 1, name: 'First Quiz Completed', description: 'Completed your first quiz', iconColor: 'text-yellow-400' },
    { id: 2, name: 'Quiz Master', description: 'Completed 10 quizzes', iconColor: 'text-indigo-600' },
    { id: 3, name: 'High Scorer', description: 'Scored above 90% in a quiz', iconColor: 'text-green-500' },
  ];

  return (
    <div className='flex'>
     
      <UserSidebar/>
      <div className="flex-1 flex flex-col overflow-auto">
         <Header/>
   <div className='p-10'>
       <header className="flex items-center space-x-3 mb-6">
        <Trophy size={32} className="text-yellow-500" />
        <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
      </header>
      {achievements.length === 0 ? (
        <p className="text-gray-700">No achievements earned yet. Keep going!</p>
      ) : (
        <ul className="space-y-4">
          {achievements.map(({ id, name, description, iconColor }) => (
            <li key={id} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
              <Trophy size={28} className={`${iconColor}`} />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                <p className="text-gray-600">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
   </div>
    </div>
    </div>
  );
};

export default AchievementsPage;