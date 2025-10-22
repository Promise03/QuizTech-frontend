import React, { useEffect, useState } from "react";
// import UserHeader from "../conponent/Header.jsx";
// import UserSidebar from "../conponent/Sidebar.jsx";

const API_BASE_URL = "http://localhost:5002/api/analytics";

const UserDashboard = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;

  const [stats, setStats] = useState({
    totalQuizzes: 0,
    highScore: 0,
    totalPoints: 0,
    recentQuizzes: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/userdashboard/${userId}`);
        const data = await res.json();
        if (data.success) {
          setStats(data);
        } else {
          console.error("Error fetching stats:", data.message);
        }
      } catch (err) {
        console.error("Error fetching user dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchStats();
  }, [userId]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-20">Loading your dashboard...</p>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-10">
          {/* Progress and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">Quizzes Completed</h3>
              <p className="text-4xl font-bold text-indigo-700">{stats.totalQuizzes}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">High Score</h3>
              <p className="text-4xl font-bold text-indigo-700">{stats.highScore}%</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">Total Points</h3>
              <p className="text-4xl font-bold text-indigo-700">{stats.totalPoints}</p>
            </div>
          </div>

          {/* Recent Quizzes Section */}
          <div className="bg-white p-8 rounded-xl shadow-md mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Recent Quizzes</h3>
            {stats.recentQuizzes.length === 0 ? (
              <p className="text-gray-500">No recent quizzes found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.recentQuizzes.map((quiz, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h4 className="text-xl font-semibold mb-2">{quiz.quizTitle}</h4>
                    <p className="text-gray-500 mb-4">
                      You scored{" "}
                      <span className="text-indigo-600 font-bold">
                        {quiz.score}/{quiz.totalQuestions}
                      </span>
                    </p>
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200"
                    >
                      View Details →
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
