import React, { useEffect, useState } from "react";
import { History } from "lucide-react";
import axios from "axios";

const QuizHistoryPage = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id || storedUser?.id;
  const token = localStorage.getItem("token");

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuizHistory = async () => {
      try {
        if (!userId || !token) {
          setError("User not authenticated. Please log in again.");
          setLoading(false);
          return;
        }

        const { data } = await axios.get(
          `${API_BASE_URL}/api/analytics/userdashboard/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("✅ Quiz history data:", data);

        if (data.success) {
          // use recentQuizzes (backend returns this array)
          setHistory(data.recentQuizzes || []);
        } else {
          setError("Failed to load quiz history.");
        }
      } catch (err) {
        console.error("❌ Error fetching quiz history:", err);
        setError("Failed to load quiz history.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizHistory();
  }, [API_BASE_URL, userId, token]);

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
                  {history.map((quiz, index) => (
                    <tr key={quiz._id || index} className="hover:bg-gray-50 transition">
                      <td className="py-3 px-4">{quiz.quizTitle}</td>
                      <td className="py-3 px-4">
                        {quiz.score}/{quiz.totalQuestions}
                      </td>
                      <td className="py-3 px-4">
                        {new Date(quiz.createdAt).toLocaleDateString()}
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
