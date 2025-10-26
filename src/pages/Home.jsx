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
     {/* 1. Hero Title Animation: Fade up quickly */}
     <h1 
                className="text-6xl font-extrabold leading-tight mb-4"
                data-aos="fade-up"
                data-aos-duration="1000"
            >
                Challenge Your Knowledge
            </h1>
     
            {/* 2. Hero Description Animation: Fade up with a slight delay */}
            <p 
                className="text-xl mb-8"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="800"
            >
                Dive into fun and challenging quizzes on various topics. Learn something new every day!
            </p>
     
            {/* 3. Hero Button Animation: Zoom in */}
            <button 
                onClick={toggleLogin} 
                className="inline-block px-8 py-4 text-xl font-bold rounded-full btn"
                data-aos="zoom-in"
                data-aos-duration="900"
                data-aos-delay="1000"
            >
                Start a Quiz
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