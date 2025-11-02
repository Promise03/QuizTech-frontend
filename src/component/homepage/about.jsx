import React from "react";
import about from "/about.jpg";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  const toggleLogin = () => {
    navigate("/login");
  };

  return (
    <section className="text-white py-20 px-6 md:px-16 about-content">
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Left Section */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold mb-4 text-blue-400">About QuizTech</h2>
          <p className="mb-5  leading-relaxed">
            QuizTech was founded in 2020 with a simple mission: to make learning fun and accessible to everyone. 
            We believe that knowledge should be engaging, interactive, and rewarding.
          </p>
          <p className="mb-5 leading-relaxed">
            Our team of educators, designers, and developers work tirelessly to create 
            high-quality quizzes that challenge and entertain users of all ages and knowledge levels.
          </p>
          <p className="mb-5 leading-relaxed">
            With over <strong>500,000+ active users</strong> and <strong>10,000+ quizzes</strong>, 
            we're proud to be one of the fastest-growing quiz platforms on the web.
          </p>
          <button
            onClick={toggleLogin}
            className="mt-4 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-3xl px-6 py-3 font-medium"
          >
            Get Started
          </button>
        </div>

        {/* Right Section (Image) */}
        <div className="flex-1 text-center">
          <img
            src={about}
            alt="About QuizTech"
            className="rounded-tl-3xl rounded-br-3xl shadow-lg w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
