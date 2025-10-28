import React, { useEffect, useState } from "react";
import { Trophy, ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QuizzesPage = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";

  const [groupedQuizzes, setGroupedQuizzes] = useState({});
  const [expandedStacks, setExpandedStacks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/quiz/allquizzes`);
        console.log("Fetched data:", response.data);

        const data = response.data.quizData || [];

        // ✅ Group quizzes by techStack
        const grouped = data.reduce((acc, quiz) => {
          const key = quiz.techStack || "Other";
          if (!acc[key]) acc[key] = [];
          acc[key].push(quiz);
          return acc;
        }, {});
        setGroupedQuizzes(grouped);

        // ✅ Default all sections to collapsed
        const initialExpanded = Object.keys(grouped).reduce((acc, key) => {
          acc[key] = false;
          return acc;
        }, {});
        setExpandedStacks(initialExpanded);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [API_BASE_URL]);

  const toggleStack = (techStack) => {
    setExpandedStacks((prev) => ({
      ...prev,
      [techStack]: !prev[techStack],
    }));
  };

  const startQuiz = (quizId) => {
    navigate(`/quiz/start/${quizId}`);
  };

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-10">
          <header className="flex items-center space-x-3 mb-6">
            <Trophy size={32} className="text-yellow-500" />
            <h1 className="text-3xl font-bold text-gray-900">
              Available Quizzes
            </h1>
          </header>

          {loading && <p className="text-gray-600">Loading quizzes...</p>}
          {error && (
            <p className="text-red-500">Error fetching quizzes: {error}</p>
          )}

          {!loading && !error && (
            Object.keys(groupedQuizzes).length === 0 ? (
              <p className="text-gray-600">
                No quizzes available yet. Check back soon!
              </p>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedQuizzes).map(([techStack, quizzes]) => (
                  <div
                    key={techStack}
                    className="bg-gray-50 rounded-xl shadow-sm border border-gray-200"
                  >
                    {/* TechStack Header */}
                    <button
                      onClick={() => toggleStack(techStack)}
                      className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-gray-100 transition"
                    >
                      <h2 className="text-xl font-bold text-indigo-700">
                        {techStack}
                      </h2>
                      {expandedStacks[techStack] ? (
                        <ChevronDown className="text-gray-600" />
                      ) : (
                        <ChevronRight className="text-gray-600" />
                      )}
                    </button>

                    {/* Collapsible Section */}
                    {expandedStacks[techStack] && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 border-t border-gray-200">
                        {quizzes.map((quiz, index) => (
                          <div
                            key={quiz._id || index}
                            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                          >
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                              {quiz.topic?.[0] || `Quiz #${index + 1}`}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">
                              Difficulty:{" "}
                              <span className="font-medium">
                                {quiz.difficulty}
                              </span>
                            </p>
                            <p className="text-gray-600 text-sm">
                              {quiz.questions?.length
                                ? `${quiz.questions.length} question(s)`
                                : "No questions yet"}
                            </p>
                            <button
                              onClick={() => startQuiz(quiz._id)}
                              disabled={!quiz.questions?.length}
                              className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                              Start Quiz
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizzesPage;
