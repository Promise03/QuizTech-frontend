import React, { useState } from 'react';
// import { Settings } from 'lucide-react';
import Header from '../conponent/Header';
import UserSidebar from '../conponent/Sidebar';

const SettingsPage = () => {
  const [username, setUsername] = useState('Alex');
  const [email, setEmail] = useState('alex@example.com');
  const [notifications, setNotifications] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings saved!');
  };

  return (
   <div className="flex h-screen bg-gray-100">
   
    <UserSidebar/>
     <div className="  flex-1 flex flex-col overflow-auto">
       <Header/>
       <div className='p-10'>
        <header className="flex items-center space-x-3 mb-6">
      
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      </header>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div>
          <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center space-x-3">
          <input
            id="notifications"
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="notifications" className="text-gray-700 font-semibold">
            Enable email notifications
          </label>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Save Settings
        </button>
      </form>

       </div>
       </div>
   </div>
  );
};

export default SettingsPage;