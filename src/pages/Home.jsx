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
<div
  className="relative flex items-center justify-center min-h-[calc(100vh)] p-6 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80')", // replace with your image
  }}
>
  {/* Overlay for readability */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/40 dark:from-gray-900/70 dark:via-gray-800/60 dark:to-gray-900/70"></div>

  {/* Content */}
  <div className="relative z-10 text-center max-w-3xl text-white">
    {/* Title */}
    <h1
      className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 font-serif"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      Challenge Your Knowledge
    </h1>

    {/* Description */}
    <p
      className="text-lg md:text-2xl mb-10 text-gray-200"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay="600"
    >
      Dive into fun and challenging quizzes on various topics.  
      Learn something new every day — grow while you play!
    </p>

    {/* CTA Button */}
    <button
      onClick={toggleLogin}
      className="relative inline-block px-10 py-4 text-lg md:text-xl font-semibold rounded-full 
                 bg-gradient-to-r from-blue-500 to-indigo-600 
                 hover:from-blue-600 hover:to-indigo-700 
                 text-white shadow-lg transition-all duration-300 
                 hover:shadow-2xl focus:ring-4 focus:ring-blue-400/50"
      data-aos="zoom-in"
      data-aos-duration="900"
      data-aos-delay="800"
    >
      Start a Quiz 🚀
    </button>
  </div>
</div>
    
   </div>
   
   
        {/* 4. Scroll Animations for Section Components: Fade in from the bottom */}
   <div data-aos="fade-up" data-aos-easing="ease-in-out">
            <About/>
        </div>
   
        {/* 5. Fade in after the About section is mostly done */}
        <div data-aos="fade-down" data-aos-delay="90" data-aos-easing="ease-in-out">
            <FAQ/>
        </div>

        {/* 6. Fade in last, slightly different animation for variety */}
        <div data-aos="slide-up" data-aos-delay="90" data-aos-easing="ease-in-out">
            <Contact/>
        </div>

   <Footer/>  
 </>
 );
};

export default Home;