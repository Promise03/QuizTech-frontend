import React from 'react';
import Header from '../component/Header';
import Footer from '../component/footer';
import About from '../component/homepage/about';
import FAQ from './faq';
import Contact from '../component/homepage/contact';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate()
  const toggleLogin = () =>{
    navigate("/login")
  }
  return (
   <>
   <Header/>
       <div className="min-h-screen Hero ">

      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-[calc(100vh-88px)] p-6">
      
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl font-extrabold  leading-tight mb-4">Challenge Your Knowledge</h1>
          <p className="text-xl  mb-8">Dive into fun and challenging quizzes on various topics. Learn something new every day!</p>
          <button onClick={toggleLogin}  className="inline-block px-8 py-4 text-xl font-bold  rounded-full btn">Start a Quiz</button>
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