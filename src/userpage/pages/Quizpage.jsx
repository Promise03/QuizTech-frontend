import React, { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

const QuizzesPage = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/quiz/allquizzes`); // ✅ backticks!
        const text = await response.text();
        console.log("Raw response:", text);

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Server did not return valid JSON");
        }

        if (!response.ok) throw new Error(data.message || "Failed to fetch quizzes");

        setQuizzes(Array.isArray(data.quizData) ? data.quizData : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [API_BASE_URL]);

  const startQuiz = (quizId) => {
    navigate(`/quiz/start/${quizId}`);
  };

  return (
    <div className="flex">
      <div className="flex-1 flex flex-col overflow-auto">
        <div className="p-10">
          <header className="flex items-center space-x-3 mb-6">
            <Trophy size={32} className="text-yellow-500" />
            <h1 className="text-3xl font-bold text-gray-900">Available Quizzes</h1>
          </header>

          {loading && <p className="text-gray-600">Loading quizzes...</p>}
          {error && <p className="text-red-500">Error fetching quizzes: {error}</p>}

          {!loading && !error && (
            quizzes.length === 0 ? (
              <p className="text-gray-600">No quizzes available yet. Check back soon!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map((quiz, index) => (
                  <div
                    key={quiz._id || index}
                    className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                  >
                    <h2 className="text-xl font-semibold text-indigo-700 mb-1">
                      {quiz.categories || quiz.topic || `Quiz #${index + 1}`}
                    </h2>
                    <p className="text-sm text-gray-500 mb-3 font-medium">
                      {quiz.category || quiz.techStack} • {quiz.difficulty}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {quiz.questions?.length
                        ? `${quiz.questions.length} question(s)`
                        : 'No questions yet'}
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
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizzesPage;
