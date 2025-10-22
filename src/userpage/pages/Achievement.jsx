import React, { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';
import Header from '../conponent/Header';
import UserSidebar from '../conponent/Sidebar';
import axios from 'axios';

const AchievementsPage = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // 🔹 Replace this with how you actually store user info
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/userdashboard/${userId}`, // ✅ Updated endpoint
          { withCredentials: true } // optional if using cookies/JWT auth
        );
        setAchievements(data.achievements || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load achievements. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchAchievements();
  }, [userId]);

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-10">
          <header className="flex items-center space-x-3 mb-6">
            <Trophy size={32} className="text-yellow-500" />
            <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
          </header>

          {loading ? (
            <p className="text-gray-700">Loading achievements...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : achievements.length === 0 ? (
            <p className="text-gray-700">No achievements earned yet. Keep going!</p>
          ) : (
            <ul className="space-y-4">
              {achievements.map(({ id, name, description, iconColor }) => (
                <li
                  key={id}
                  className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  <Trophy size={28} className={iconColor} />
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
