import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import Header from '../component/Header';
import Footer from '../component/footer';

const Contact = () => {
  return (
    <>
      <Header/>
        <div className='h-screen contact-hero flex items-center justify-center  '>
          <div className='text-center max-w-2xl'>
            <h1 className="text-6xl font-extrabold  leading-tight mb-4">Contact Us</h1>
          </div>
        </div>
       <div className="min-h-screen contact px-8 py-20">
      <div className="container mx-auto max-w-4xl  p-12 rounded-2xl shadow-xl con-card">
        <h2 className="text-5xl font-extrabold text-center text-indigo-900 mb-12">Get in Touch</h2>
        <div className="grid md:grid-cols-2 gap-12 ">
          {/* Contact Form */}
          <div>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" name="name" className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"/>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" name="message" rows="4" className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"></textarea>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="inline-block px-8 py-4 text-lg font-bold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300">Send Message</button>
              </div>
            </form>
          </div>
          
          {/* Contact Details & Social Media */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-semibold text-indigo-800 mb-4">Contact Information</h3>
              <div className="flex items-center space-x-4 text-lg text-gray-600 mb-3">
                <Mail size={24} className="text-indigo-600"/>
                <span>hello@quizup.com</span>
              </div>
              <div className="flex items-center space-x-4 text-lg text-gray-600 mb-3">
                <Phone size={24} className="text-indigo-600"/>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-4 text-lg text-gray-600">
                <MapPin size={24} className="text-indigo-600"/>
                <span>123 Quiz Street, Knowledge City, QZ 12345</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-semibold text-indigo-800 mb-4">Follow Us</h3>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-300">
                  <Facebook size={32}/>
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-300">
                  <Twitter size={32}/>
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-300">
                  <Instagram size={32}/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
   
  );
};

export default Contact;