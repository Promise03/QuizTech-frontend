import React from 'react';
import { Lightbulb, Sparkles, Scale } from 'lucide-react';
import Header from '../component/Header';
import Footer from '../component/footer';

const About = () => {
  return (
    <>
     <Header/>
     <div className="min-h-screen about  px-8 py-20">
      <div className="container mx-auto">
        <h2 className="text-5xl font-extrabold text-center text-indigo-900 mb-12">About Us</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-gray-600">
              Our mission is to make learning fun and accessible to everyone. We believe that quizzes are a powerful tool for education and personal growth. Whether you're a student, a professional, or just curious, our platform offers a wide range of quizzes to help you explore new subjects and test your knowledge.
            </p>
            <p className="text-lg leading-relaxed text-gray-600">
              We're a small but passionate team dedicated to creating high-quality, engaging content. We're constantly working on adding new features and quizzes to make your experience even better.
            </p>
          </div>
          <div>
            <img src="/about1.jpg" alt="Image of our team working" className="rounded-xl shadow-2xl"/>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-4xl font-bold text-center  mb-10">Our Values</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="abt-card p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <Lightbulb size={48} className="mx-auto mb-4 text-indigo-600"/>
              <h4 className="text-2xl font-semibold mb-2">Knowledge</h4>
              <p className="">We believe in the power of learning and curiosity to drive growth.</p>
            </div>
            <div className="abt-card p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <Sparkles size={48} className="mx-auto mb-4 text-indigo-600"/>
              <h4 className="text-2xl font-semibold mb-2">Fun</h4>
              <p className="">Learning shouldn't be a chore. We make it an enjoyable and engaging experience.</p>
            </div>
            <div className="abt-card p-8 rounded-xl shadow-lg transform transition-transform hover:scale-105">
              <Scale size={48} className="mx-auto mb-4 text-indigo-600"/>
              <h4 className="text-2xl font-semibold mb-2">Fairness</h4>
              <p className="">We ensure that our quizzes are balanced and that results are accurate.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
   
  );
};

export default About;