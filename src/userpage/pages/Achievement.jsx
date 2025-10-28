import React, { useEffect, useState } from 'react';
import { Trophy, Loader2, AlertCircle, Clock, Star } from 'lucide-react';
import axios from 'axios';

const AchievementsPage = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?.id;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        if (!userId || !token) {
          setError('User not authenticated. Please log in again.');
          setLoading(false);
          return;
        }

        console.log("User ID:", userId);
        console.log("Token:", token);

        const response = await axios.get(`${API_BASE_URL}/api/analytics/userdashboard/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log("✅ API Response:", response.data);
        setStats(response.data);
      } catch (err) {
        console.error('❌ Error fetching achievements:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Failed to load achievements. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [API_BASE_URL, userId, token]);

  // 🧩 UI
  return (
    <div className="flex flex-col items-center bg-gray-50 min-h-screen py-10">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">
        {/* Header */}
        <header className="flex items-center space-x-3 mb-8">
          <Trophy size={36} className="text-yellow-500" />
          <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
        </header>

        {/* Loading */}
        {loading && (
          <div className="flex items-center space-x-3 text-gray-700">
            <Loader2 className="animate-spin" size={20} />
            <span>Loading achievements...</span>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        {/* Main Content */}
        {!loading && !error && stats && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-yellow-50 p-4 rounded-lg text-center shadow-sm border border-yellow-100">
                <h3 className="text-sm font-medium text-gray-600">Total Quizzes</h3>
                <p className="text-2xl font-bold text-yellow-600">{stats.totalQuizzes || 0}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center shadow-sm border border-green-100">
                <h3 className="text-sm font-medium text-gray-600">Total Points</h3>
                <p className="text-2xl font-bold text-green-600">{stats.totalPoints || 0}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center shadow-sm border border-blue-100">
                <h3 className="text-sm font-medium text-gray-600">High Score</h3>
                <p className="text-2xl font-bold text-blue-600">{stats.highScore || 0}</p>
              </div>
            </div>

            {/* Recent Quizzes */}
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Quizzes</h2>
            {stats.recentQuizzes?.length > 0 ? (
              <ul className="space-y-4">
                {stats.recentQuizzes.map((quiz, index) => (
                  <li key={index} className="flex justify-between items-center bg-gray-50 border border-gray-100 hover:border-gray-300 transition rounded-lg p-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{quiz.techStack}</h3>
                      <p className="text-gray-600">Score: {quiz.score}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock size={16} />
                      <span>{new Date(quiz.dateTaken).toLocaleDateString()}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-center py-4">No recent quizzes yet. Take one to see your progress!</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AchievementsPage;
