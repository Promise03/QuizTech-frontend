import React, { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';
import axios from 'axios';

const AchievementsPage = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ✅ Get user and token from local storage
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?.id;
  const token = localStorage.getItem('token'); // assuming you store it like this

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        if (!userId || !token) {
          setError('User not authenticated. Please log in again.');
          setLoading(false);
          return;
        }

        // ✅ Fetch without withCredentials — using Bearer token instead
        const response = await axios.get(`${API_BASE_URL}/api/userdashboard/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setAchievements(response.data.achievements || []);
      } catch (err) {
        console.error(err);
        setError('Failed to load achievements. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [API_BASE_URL, userId, token]);

  return (
    <div className="flex">
      {/* Sidebar */}
      {/* <UserSidebar /> */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* <Header /> */}
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
              {achievements.map((ach, index) => (
                <li
                  key={ach._id || index}
                  className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  <Trophy size={28} className={ach.iconColor || 'text-yellow-400'} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{ach.name}</h3>
                    <p className="text-gray-600">{ach.description}</p>
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
