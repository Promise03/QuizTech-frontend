// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // 🛑 IMPORTANT: You must import useSelector from 'react-redux'
// import { useSelector } from "react-redux"; 
// import { PlusCircle, FileQuestion, X, Eye, Trash2 } from "lucide-react"; 

// const QuizzesPage = () => {
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";


//     const [quizzes, setQuizzes] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedQuiz, setSelectedQuiz] = useState(null);

//     // 🛑 CRITICAL STEP 1: Access the user object from Redux
//     // Replace 'login' with your actual slice name (e.g., 'auth') if different
//     const { user } = useSelector((state) => state.login); 

//     // State for form data (unchanged)
//     const [formData, setFormData] = useState({
//         topic: "",
//         techStack: "",
//         difficulty: "",
//         questions: [
//             {
//                 questionText: "",
//                 options: ["", "", "", ""],
//                 correctAnswer: "",
//                 explanation: "",
//             },
//         ],
//     });

//     // ✅ Fetch quizzes from backend
//     const fetchQuizzes = async () => {
//         try {
//             const res = await axios.get(`${API_BASE_URL}/api/quiz/allquizzes`);
//             setQuizzes(res.data.quizData || []);
//         } catch (error) {
//             console.error("Error fetching quizzes:", error);
//         }
//     };

//     useEffect(() => {
//         fetchQuizzes();
//     }, []);

//     // --- Utility Functions (Form Handlers) ---
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
//     const handleQuestionChange = (index, field, value) => {
//         const updated = [...formData.questions];
//         updated[index][field] = value;
//         setFormData({ ...formData, questions: updated });
//     };
//     const handleOptionChange = (qIndex, oIndex, value) => {
//         const updated = [...formData.questions];
//         updated[qIndex].options[oIndex] = value;
//         setFormData({ ...formData, questions: updated });
//     };
//     const addQuestion = () => {
//         setFormData({
//             ...formData,
//             questions: [
//                 ...formData.questions,
//                 {
//                     questionText: "",
//                     options: ["", "", "", ""],
//                     correctAnswer: "",
//                     explanation: "",
//                 },
//             ],
//         });
//     };
//     const resetForm = () => {
//         setFormData({
//             topic: "",
//             techStack: "",
//             difficulty: "",
//             questions: [
//                 {
//                     questionText: "",
//                     options: ["", "", "", ""],
//                     correctAnswer: "",
//                     explanation: "",
//                 },
//             ],
//         });
//     };
//     // --- End Utility Functions ---

//     // ✅ Submit quiz creation
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         const token = localStorage.getItem('token');

//         if (!token || !user || !user._id) {
//             alert("❌ Authorization failed: You must be logged in to create a quiz.");
//             setLoading(false);
//             return;
//         }

//         // 🛑 CRITICAL FIX 1: Add the 'createdBy' field to the payload
//         const dataToSend = {
//             ...formData,
//             createdBy: user._id 
//         };

//         // 🛑 CRITICAL FIX 2: Define and pass the authorization headers
//         const config = {
//             headers: {
//                 'Authorization': `Bearer ${token}` 
//             }
//         };
        
//         try {
//             const res = await axios.post(
//                 `${API_BASE_URL}/api/quiz/createQuiz`,
//                 dataToSend, // Send data with createdBy
//                 config      // Send auth headers
//             );
            
//             alert("✅ Quiz created successfully!");
//             setShowModal(false);
//             resetForm();

//             // Update state with the new quiz from the response
//             if (res.data.newQuiz) {
//                 setQuizzes((prev) => [...prev, res.data.newQuiz]);
//             } else {
//                  // Fallback if backend uses a different property name
//                  await fetchQuizzes(); 
//             }

//         } catch (error) {
//             console.error("Error creating quiz:", error.response?.data || error.message);
            
//             // Log the specific validation message if available
//             const errorMessage = error.response?.data?.message || "Failed to create quiz. Check console for details.";
//             alert(`❌ ${errorMessage}`);
            
//         } finally {
//             setLoading(false);
//         }
//     };

//     // ✅ Handle Quiz Deletion
//     const handleDeleteQuiz = async (quizId, quizTitle) => {
//         if (!window.confirm(`Are you sure you want to delete the quiz: "${quizTitle}"?`)) {
//             return;
//         }

//         const token = localStorage.getItem('token');
//         if (!token) {
//             alert("❌ You must be logged in to delete a quiz.");
//             return;
//         }

//         const config = {
//             headers: {
//                 'Authorization': `Bearer ${token}` 
//             }
//         };
        
//         try {
//             // 🛑 CRITICAL FIX 3: Use axios.delete and pass config 🛑
//             await axios.delete(`${API_BASE_URL}/api/quiz/deleteQuiz/${quizId}`, config);

//             alert("🗑️ Quiz deleted successfully!");
            
//             // Update the frontend state to remove the deleted quiz
//             setQuizzes((prev) => prev.filter(quiz => quiz._id !== quizId));

//         } catch (error) {
//             console.error("Error deleting quiz:", error);
//             if (error.response && error.response.status === 403) {
//                 alert("❌ Deletion failed: You do not have permission (Admin role required).");
//             } else {
//                 alert("❌ Failed to delete quiz. Check console for details.");
//             }
//         } 
//     };

//     return (
//         <div className="bg-white shadow-md rounded-2xl p-6">
//             {/* Header */}
//             <div className="flex items-center justify-between mb-6">
//                 <div>
//                     <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//                         <FileQuestion className="text-indigo-600" />
//                         Quizzes Management
//                     </h1>
//                     <p className="text-gray-500 text-sm">
//                         Create and manage all quizzes with categories and difficulty levels
//                     </p>
//                 </div>

//                 <button
//                     onClick={() => {
//                         resetForm();
//                         setShowModal(true);
//                     }}
//                     className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
//                 >
//                     <PlusCircle size={18} />
//                     Add Quiz
//                 </button>
//             </div>

//             {/* Quizzes Grid */}
//             {quizzes.length === 0 ? (
//                 <p className="text-gray-500 text-center py-10">No quizzes found.</p>
//             ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {quizzes.map((quiz) => (
//                         <div
//                             key={quiz._id}
//                             className="p-5 border rounded-xl shadow-sm bg-gradient-to-br from-indigo-50 to-white hover:shadow-md transition"
//                         >
//                             <h2 className="text-lg font-semibold text-gray-800 mb-1">
//                                 {quiz.categories || quiz.techStack || 'Untitled Quiz'} 
//                             </h2>
//                             <p className="text-sm text-gray-600">
//                                 {quiz.category || quiz.topic} • {quiz.difficulty}
//                             </p>
//                             <p className="text-xs text-gray-500 mt-2">
//                                 {quiz.questions?.length || 0} Question
//                                 {quiz.questions?.length !== 1 ? "s" : ""}
//                             </p>

//                             <div className="flex justify-between items-center mt-4">
//                                 {/* View Button */}
//                                 <button
//                                     onClick={() => setSelectedQuiz(quiz)}
//                                     className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
//                                 >
//                                     <Eye size={16} /> View
//                                 </button>
                                
//                                 {/* DELETE BUTTON */}
//                                 <button
//                                     onClick={(e) => {
//                                         e.stopPropagation(); 
//                                         handleDeleteQuiz(quiz._id, quiz.categories || quiz.topic || 'This Quiz');
//                                     }}
//                                     className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium"
//                                     title="Delete Quiz"
//                                 >
//                                     <Trash2 size={16} /> Delete
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* Create Quiz Modal JSX */}
//             {showModal && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-2xl p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh] relative">
//                         <button
//                             onClick={() => {
//                                 setShowModal(false);
//                                 resetForm();
//                             }}
//                             className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
//                         >
//                             <X size={20} />
//                         </button>

//                         <h2 className="text-xl font-bold mb-4 text-gray-800">
//                             Create New Quiz
//                         </h2>

//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             {/* Topic Input */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Topic / Categories
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="topic"
//                                     value={formData.topic}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//                                     placeholder="e.g. HTML, JavaScript"
//                                 />
//                             </div>

//                             {/* Tech Stack/Category Select */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Tech Stack (Frontend / Backend)
//                                 </label>
//                                 <select
//                                     name="techStack"
//                                     value={formData.techStack}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//                                 >
//                                     <option value="">Select Tech Stack</option>
//                                     <option value="Frontend">Frontend</option>
//                                     <option value="Backend">Backend</option>
//                                 </select>
//                             </div>

//                             {/* Difficulty */}
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Difficulty
//                                 </label>
//                                 <select
//                                     name="difficulty"
//                                     value={formData.difficulty}
//                                     onChange={handleChange}
//                                     required
//                                     className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//                                 >
//                                     <option value="">Select Difficulty</option>
//                                     <option value="Easy">Easy</option>
//                                     <option value="Intermediate">Intermediate</option>
//                                     <option value="Advanced">Advanced</option>
//                                 </select>
//                             </div>

//                             {/* Questions */}
//                             <div className="space-y-6">
//                                 {formData.questions.map((q, qIndex) => (
//                                     <div key={qIndex} className="border p-3 rounded-lg">
//                                         <label className="block text-sm font-medium mb-1">
//                                             Question {qIndex + 1}
//                                         </label>
//                                         <input
//                                             type="text"
//                                             value={q.questionText}
//                                             onChange={(e) =>
//                                                 handleQuestionChange(qIndex, "questionText", e.target.value)
//                                             }
//                                             placeholder="Enter question"
//                                             className="w-full border rounded-lg p-2 mb-2"
//                                         />

//                                         {q.options.map((opt, oIndex) => (
//                                             <input
//                                                 key={oIndex}
//                                                 type="text"
//                                                 value={opt}
//                                                 onChange={(e) =>
//                                                     handleOptionChange(qIndex, oIndex, e.target.value)
//                                                 }
//                                                 placeholder={`Option ${oIndex + 1}`}
//                                                 className="w-full border rounded-lg p-2 mb-2"
//                                             />
//                                         ))}

//                                         <input
//                                             type="text"
//                                             value={q.correctAnswer}
//                                             onChange={(e) =>
//                                                 handleQuestionChange(qIndex, "correctAnswer", e.target.value)
//                                             }
//                                             placeholder="Correct answer (must match one of the options exactly)"
//                                             className="w-full border rounded-lg p-2 mb-2"
//                                         />

//                                         <textarea
//                                             value={q.explanation}
//                                             onChange={(e) =>
//                                                 handleQuestionChange(qIndex, "explanation", e.target.value)
//                                             }
//                                             placeholder="Explanation (optional)"
//                                             className="w-full border rounded-lg p-2"
//                                         ></textarea>
//                                     </div>
//                                 ))}

//                                 <button
//                                     type="button"
//                                     onClick={addQuestion}
//                                     className="bg-gray-100 text-indigo-700 px-3 py-2 rounded-lg hover:bg-indigo-50 text-sm"
//                                 >
//                                     + Add Another Question
//                                 </button>
//                             </div>

//                             <button
//                                 type="submit"
//                                 disabled={loading}
//                                 className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
//                             >
//                                 {loading ? "Creating..." : "Create Quiz"}
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* View Quiz Modal JSX */}
//             {selectedQuiz && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
//                         <button
//                             onClick={() => setSelectedQuiz(null)}
//                             className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
//                         >
//                             <X size={20} />
//                         </button>

//                         <h2 className="text-xl font-bold text-gray-800 mb-4">
//                             {selectedQuiz.categories || selectedQuiz.topic} Quiz
//                         </h2>

//                         <p className="text-gray-600 text-sm mb-3">
//                             Category: {selectedQuiz.category || selectedQuiz.techStack} • Difficulty:{" "}
//                             {selectedQuiz.difficulty}
//                         </p>

//                         <div className="space-y-4">
//                             {selectedQuiz.questions.map((q, i) => (
//                                 <div key={i} className="border p-3 rounded-lg">
//                                     <p className="font-semibold text-gray-800">
//                                         {i + 1}. {q.questionText}
//                                     </p>
//                                     <ul className="list-disc ml-5 mt-2 text-gray-600 text-sm">
//                                         {q.options.map((opt, j) => (
//                                             <li key={j}>{opt}</li>
//                                         ))}
//                                     </ul>
//                                     <p className="mt-2 text-sm text-green-700 font-medium">
//                                         ✅ Correct Answer: {q.correctAnswer}
//                                     </p>
//                                     {q.explanation && (
//                                         <p className="mt-1 text-xs text-gray-500 italic">
//                                             💡 {q.explanation}
//                                         </p>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default QuizzesPage;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { PlusCircle, FileQuestion, X, Eye, Trash2 } from "lucide-react";

const QuizzesPage = () => {
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const { user } = useSelector((state) => state.login);

  const [formData, setFormData] = useState({
    topic: "",
    techStack: "",
    difficulty: "",
    questions: [
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        explanation: "",
      },
    ],
  });

  // ✅ Fetch quizzes from backend
  const fetchQuizzes = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/quiz/allquizzes`);
      setQuizzes(res.data.quizData || []);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  // --- Handlers for form ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...formData.questions];
    updated[index][field] = value;
    setFormData({ ...formData, questions: updated });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...formData.questions];
    updated[qIndex].options[oIndex] = value;
    setFormData({ ...formData, questions: updated });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          questionText: "",
          options: ["", "", "", ""],
          correctAnswer: "",
          explanation: "",
        },
      ],
    });
  };

  const resetForm = () => {
    setFormData({
      topic: "",
      techStack: "",
      difficulty: "",
      questions: [
        {
          questionText: "",
          options: ["", "", "", ""],
          correctAnswer: "",
          explanation: "",
        },
      ],
    });
  };

  // ✅ Submit quiz creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    if (!token || !user || !user._id) {
      alert("❌ You must be logged in to create a quiz.");
      setLoading(false);
      return;
    }

    const dataToSend = {
      ...formData,
      createdBy: user._id,
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/quiz/createQuiz`,
        dataToSend,
        config
      );

      alert("✅ Quiz created successfully!");
      setShowModal(false);
      resetForm();

      if (res.data.newQuiz) {
        setQuizzes((prev) => [...prev, res.data.newQuiz]);
      } else {
        await fetchQuizzes();
      }
    } catch (error) {
      console.error("Error creating quiz:", error.response?.data || error);
      alert(
        `❌ ${
          error.response?.data?.message || "Failed to create quiz. Try again."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete quiz
  const handleDeleteQuiz = async (quizId, quizTitle) => {
    if (!window.confirm(`Delete "${quizTitle}"?`)) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ You must be logged in to delete a quiz.");
      return;
    }

    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.delete(`${API_BASE_URL}/api/quiz/deleteQuiz/${quizId}`, config);
      alert("🗑️ Quiz deleted successfully!");
      setQuizzes((prev) => prev.filter((quiz) => quiz._id !== quizId));
    } catch (error) {
      console.error("Error deleting quiz:", error);
      alert("❌ Failed to delete quiz. Check console for details.");
    }
  };

  // ✅ Group quizzes by techStack (Frontend, Backend, etc.)
  const groupedQuizzes = quizzes.reduce((groups, quiz) => {
    const key = quiz.techStack || "Uncategorized";
    if (!groups[key]) groups[key] = [];
    groups[key].push(quiz);
    return groups;
  }, {});

  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FileQuestion className="text-indigo-600" />
            Quizzes Management
          </h1>
          <p className="text-gray-500 text-sm">
            Create and manage all quizzes, grouped by tech stack
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <PlusCircle size={18} />
          Add Quiz
        </button>
      </div>

      {/* Display quizzes grouped by Tech Stack */}
      {Object.keys(groupedQuizzes).length === 0 ? (
        <p className="text-gray-500 text-center py-10">No quizzes found.</p>
      ) : (
        Object.entries(groupedQuizzes).map(([stack, stackQuizzes]) => (
          <div key={stack} className="mb-8">
            <h2 className="text-xl font-semibold text-indigo-700 mb-3 border-b pb-1">
              {stack} Quizzes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stackQuizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  className="p-5 border rounded-xl shadow-sm bg-gradient-to-br from-indigo-50 to-white hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {quiz.topic || "Untitled Quiz"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Difficulty: {quiz.difficulty}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {quiz.questions?.length || 0} Question
                    {quiz.questions?.length !== 1 ? "s" : ""}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => setSelectedQuiz(quiz)}
                      className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      <Eye size={16} /> View
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteQuiz(
                          quiz._id,
                          quiz.topic || quiz.techStack || "This Quiz"
                        );
                      }}
                      className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Create Quiz Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Create New Quiz
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Topic */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topic
                </label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tech Stack
                </label>
                <select
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="">Select Tech Stack</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                </select>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="">Select Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              {/* Questions */}
              <div className="space-y-6">
                {formData.questions.map((q, qIndex) => (
                  <div key={qIndex} className="border p-3 rounded-lg">
                    <label className="block text-sm font-medium mb-1">
                      Question {qIndex + 1}
                    </label>
                    <input
                      type="text"
                      value={q.questionText}
                      onChange={(e) =>
                        handleQuestionChange(qIndex, "questionText", e.target.value)
                      }
                      placeholder="Enter question"
                      className="w-full border rounded-lg p-2 mb-2"
                    />

                    {q.options.map((opt, oIndex) => (
                      <input
                        key={oIndex}
                        type="text"
                        value={opt}
                        onChange={(e) =>
                          handleOptionChange(qIndex, oIndex, e.target.value)
                        }
                        placeholder={`Option ${oIndex + 1}`}
                        className="w-full border rounded-lg p-2 mb-2"
                      />
                    ))}

                    <input
                      type="text"
                      value={q.correctAnswer}
                      onChange={(e) =>
                        handleQuestionChange(qIndex, "correctAnswer", e.target.value)
                      }
                      placeholder="Correct answer"
                      className="w-full border rounded-lg p-2 mb-2"
                    />

                    <textarea
                      value={q.explanation}
                      onChange={(e) =>
                        handleQuestionChange(qIndex, "explanation", e.target.value)
                      }
                      placeholder="Explanation (optional)"
                      className="w-full border rounded-lg p-2"
                    ></textarea>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addQuestion}
                  className="bg-gray-100 text-indigo-700 px-3 py-2 rounded-lg hover:bg-indigo-50 text-sm"
                >
                  + Add Another Question
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Quiz"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View Quiz Modal */}
      {selectedQuiz && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedQuiz(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {selectedQuiz.topic} Quiz
            </h2>

            <p className="text-gray-600 text-sm mb-3">
              Tech Stack: {selectedQuiz.techStack} • Difficulty:{" "}
              {selectedQuiz.difficulty}
            </p>

            <div className="space-y-4">
              {selectedQuiz.questions.map((q, i) => (
                <div key={i} className="border p-3 rounded-lg">
                  <p className="font-semibold text-gray-800">
                    {i + 1}. {q.questionText}
                  </p>
                  <ul className="list-disc ml-5 mt-2 text-gray-600 text-sm">
                    {q.options.map((opt, j) => (
                      <li key={j}>{opt}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-sm text-green-700 font-medium">
                    ✅ Correct Answer: {q.correctAnswer}
                  </p>
                  {q.explanation && (
                    <p className="mt-1 text-xs text-gray-500 italic">
                      💡 {q.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizzesPage;
