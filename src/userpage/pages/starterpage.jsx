import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, Hourglass, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useSelector } from "react-redux";


const QuizStarter = () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    // 1. Get the quizId from the URL parameters
    const { quizId } = useParams(); 
    const navigate = useNavigate();
    const { user, token } = useSelector((state) => state.login);

    
    // State for data fetching
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for the quiz interface
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState({}); // To store user's selection for each question

    // ✅ Fetch the specific quiz data
    useEffect(() => {
        if (!quizId) {
            setError("Quiz ID not found.");
            setLoading(false);
            return;
        }

        const fetchQuiz = async () => {
            try {
                // Assuming your backend has an endpoint like this to get a single quiz by ID
                const res = await axios.get(`${API_BASE_URL}/api/quiz/${quizId}`);
                setQuiz(res.data.quiz); 
            } catch (err) {
                console.error("Error fetching quiz:", err);
                setError("Failed to load quiz. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [quizId]); // Re-run if quizId changes (shouldn't happen on this page)

    // Handle user selecting an option
    const handleAnswerSelect = (option) => {
        setSelectedAnswer(option);
        setUserAnswers(prev => ({
            ...prev,
            [quizId]: { // Use quizId as the key
                ...prev[quizId],
                [currentQuestionIndex]: option // Store selected option for current question
            }
        }));
    };

    // Handle moving to the next question
    const handleNextQuestion = () => {
        // Simple logic to move to the next question if it exists
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setSelectedAnswer(null); // Clear selection for the new question

            // Re-load the previous answer if available
            const savedAnswer = userAnswers[quizId]?.[currentQuestionIndex + 1];
            if (savedAnswer) {
                setSelectedAnswer(savedAnswer);
            }

        } else {
            // If it's the last question, submit the quiz
            handleSubmitQuiz();
        }
    };
    
const handleSubmitQuiz = async () => {
  let finalScore = 0;

  quiz.questions.forEach((q, index) => {
    const userAnswer = userAnswers[quizId]?.[index];
    if (userAnswer && userAnswer === q.correctAnswer) {
      finalScore += 1;
    }
  });

  setScore(finalScore);
  setIsSubmitted(true);

  try {
    const payload = {
      quizId,
      userId: user?.id || "672b1d2exampleid", // ✅ uses logged-in user's ID
      score: finalScore,
      totalQuestions: quiz.questions.length,
    };

    console.log("🟢 Sending Quiz Submission:", payload);

    // ✅ Get JWT token from localStorage
    // const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5002/api/quiz/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ Add token here
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("✅ Quiz submitted successfully:", data);
    } else {
      console.error("❌ Quiz submission failed:", data.message || data);
    }
  } catch (err) {
    console.error("⚠️ Error submitting quiz:", err);
  }
};



    // Loading and Error States
    if (loading) {
        return <div className="p-10 text-center text-indigo-600">Loading quiz...</div>;
    }

    if (error) {
        return <div className="p-10 text-center text-red-500">Error: {error}</div>;
    }
    
    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
        return <div className="p-10 text-center text-gray-500">Quiz not found or has no questions.</div>;
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const totalQuestions = quiz.questions.length;
    
    // ------------------------------------------------
    // If quiz is submitted, show results
    // ------------------------------------------------
    if (isSubmitted) {
        return (
            <div className="max-w-xl mx-auto p-8 bg-white shadow-2xl rounded-xl mt-10 text-center">
                <FileText size={48} className="mx-auto text-green-500 mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
                <p className="text-xl text-gray-600 mb-6">
                    You scored **{score} out of {totalQuestions}**
                </p>
                <button
                    onClick={() => navigate('/user/quizzes')}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                    Back to Quizzes
                </button>
            </div>
        );
    }
    
    // ------------------------------------------------
    // Quiz Interface
    // ------------------------------------------------
    return (
        <div className="max-w-3xl mx-auto p-6 md:p-10 bg-white shadow-xl rounded-2xl mt-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <FileText className="text-indigo-600" /> 
                {quiz.categories || quiz.topic} Quiz
            </h1>
            <div className="flex justify-between items-center text-sm text-gray-500 border-b pb-4 mb-6">
                <p>Category: **{quiz.category || quiz.techStack}**</p>
                <p className="flex items-center gap-1">
                    <Hourglass size={16} /> Difficulty: **{quiz.difficulty}**
                </p>
            </div>

            <div className="text-lg font-semibold text-indigo-600 mb-4">
                Question {currentQuestionIndex + 1} of {totalQuestions}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border mb-6">
                <p className="text-xl font-medium text-gray-900">
                    {currentQuestion.questionText}
                </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerSelect(option)}
                        className={`w-full text-left p-3 border rounded-lg transition-all 
                            ${selectedAnswer === option 
                                ? 'bg-indigo-500 text-white border-indigo-600 shadow-md' 
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
            
            {/* Navigation Button */}
            <div className="mt-8 text-right">
                <button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswer}
                    className="flex items-center gap-2 ml-auto bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Submit Quiz'}
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default QuizStarter;