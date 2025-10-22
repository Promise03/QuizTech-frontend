import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white text-center px-6">
      <div className="flex items-center justify-center mb-6 animate-bounce">
        <AlertTriangle className="w-16 h-16 text-red-500" />
      </div>

      <h1 className="text-6xl font-extrabold tracking-tight mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-400 max-w-md mb-8">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-red-500/30"
      >
        Go Back Home
      </button>
    </div>
  );
}
