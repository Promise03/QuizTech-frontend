import React from 'react';
import Header from '../component/Header';
import Footer from '../component/footer';
import About from '../component/homepage/about';
import FAQ from './faq';
import Contact from '../component/homepage/contact';

const Home = () => {
  return (
   <>
   <Header/>
       <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 text-gray-800">

      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-[calc(100vh-88px)] p-6">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl font-extrabold text-indigo-900 leading-tight mb-4">Challenge Your Knowledge</h1>
          <p className="text-xl text-gray-600 mb-8">Dive into fun and challenging quizzes on various topics. Learn something new every day!</p>
          <a href="/quizzes" className="inline-block px-8 py-4 text-xl font-bold text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300">Start a Quiz</a>
        </div>
      </div>
       </div>
       <About/>
       <FAQ/>
       <Contact/>
      <Footer/>
   </>
    
      
   
  );
};

export default Home;