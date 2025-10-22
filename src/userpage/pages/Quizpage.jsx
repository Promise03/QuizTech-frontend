import React, { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';
// Assuming you are using React Router for navigation
import { useNavigate } from 'react-router-dom'; 
import Header from '../conponent/Header';
import UserSidebar from '../conponent/Sidebar';

const QuizzesPage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize the navigation hook
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                // Using standard fetch API
                const response = await fetch('http://localhost:5002/api/quiz/allquizzes');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                // Ensure data.quizData is an array before setting state
                setQuizzes(Array.isArray(data.quizData) ? data.quizData : []); 
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    // ✅ New function to handle starting a quiz
    const startQuiz = (quizId) => {
        // We'll navigate to a specific quiz page, passing the quizId in the URL.
        // The target component (e.g., /quiz/:id) would then fetch the quiz questions.
        navigate(`/quiz/start/${quizId}`);

        // If you needed to use the specific endpoint format you mentioned (e.g., for filtering by category),
        // the URL would be dynamic based on the quiz's category property (e.g., /api/quiz/Quiz/Frontend).
        // However, for starting a quiz instance, passing the unique ID is generally better.
        console.log(`Navigating to start quiz with ID: ${quizId}`);
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
                        <>
                            {quizzes.length === 0 ? (
                                <p className="text-gray-600">No quizzes available yet. Check back soon!</p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {quizzes.map((quiz, index) => (
                                        <div
                                            key={quiz._id || index}
                                            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                                        >
                                            <h2 className="text-xl font-semibold text-indigo-700 mb-1">
                                                {/* ✅ FIX: Corrected typo from catagories to categories */}
                                                {quiz.categories || quiz.topic || `Quiz #${index + 1}`} 
                                            </h2>
                                            <p className="text-sm text-gray-500 mb-3 font-medium">
                                                {quiz.category || quiz.techStack} • {quiz.difficulty}
                                            </p>
                                            <p className="text-gray-600 text-sm">
                                                {quiz.questions?.length
                                                    ? `${quiz.questions.length} question(s) available`
                                                    : 'No questions yet'}
                                            </p>
                                            
                                            {/* ✅ Button calls startQuiz with the unique quiz ID */}
                                            <button 
                                                onClick={() => startQuiz(quiz._id)}
                                                disabled={quiz.questions?.length === 0}
                                                className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                                            >
                                                Start Quiz
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizzesPage;