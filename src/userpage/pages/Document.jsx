import React from 'react';
import { FileText } from 'lucide-react';
import Header from '../conponent/Header';
import UserSidebar from '../conponent/Sidebar';

const DocumentPage = () => {
  return (
   <div className='flex'>
   
    <UserSidebar/>
     <div className="flex-1 flex flex-col overflow-auto">
       <Header/>
    <div className='p-10'>
        <header className="flex items-center space-x-3 mb-6">
        <FileText size={32} className="text-gray-700" />
        <h1 className="text-3xl font-bold text-gray-900">Document</h1>
      </header>
      <p className="text-gray-700 mb-6">
        Here you can find important documents and resources related to your quizzes and achievements.
      </p>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Available Documents</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <a href="/docs/quiz-guide.pdf" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Quiz Guide (PDF)
            </a>
          </li>
          <li>
            <a href="/docs/achievement-rules.pdf" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Achievement Rules (PDF)
            </a>
          </li>
          <li>
            <a href="/docs/terms.pdf" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Terms and Conditions (PDF)
            </a>
          </li>
        </ul>
      </div>
    </div>
    </div>
   </div>
  );
};

export default DocumentPage;