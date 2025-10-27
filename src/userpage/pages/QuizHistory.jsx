import React, { useEffect, useState } from 'react';
import { History } from 'lucide-react';
import axios from 'axios';

const QuizHistoryPage = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // ✅ Make sure user data exists
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?._id;

  useEffect(() => {
    const fetchQuizHistory = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/anaylitics/userdashboard/${userId}`, // ✅ Correct route prefix
          { withCredentials: true }
        );

        // ✅ Expect backend to return { history: [...] } or fallback to []
        setHistory(data.history || []);
      } catch (err) {
        console.error('Error fetching quiz history:', err);
        setError('Failed to load quiz history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchQuizHistory();
    else setError('User not found. Please log in again.');
  }, [userId]);

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-10">
          <header className="flex items-center space-x-3 mb-6">
            <History size={32} className="text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Quiz History</h1>
          </header>

          {loading ? (
            <p className="text-gray-700">Loading quiz history...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : history.length === 0 ? (
            <p className="text-gray-700">You have not taken any quizzes yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-white rounded-lg shadow">
                <thead>
                  <tr className="border-b border-gray-300 bg-gray-100">
                    <th className="py-3 px-4 font-semibold text-gray-800">Quiz</th>
                    <th className="py-3 px-4 font-semibold text-gray-800">Score</th>
                    <th className="py-3 px-4 font-semibold text-gray-800">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map(({ id, title, score, date }) => (
                    <tr key={id} className="hover:bg-gray-50 transition">
                      <td className="py-3 px-4">{title}</td>
                      <td className="py-3 px-4">{score}%</td>
                      <td className="py-3 px-4">
                        {new Date(date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizHistoryPage;
