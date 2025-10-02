import React from 'react'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <div >
      <div className='flex justify-between m-7 items-center'>
        <div className='w-1/5'>
             <h1 className='text-3xl font-semibold mb-4 font-serif'>QuizTech</h1>
             <p>Enzzyme Capital Partners, a fund manager with 50+ years of collective VC experience, has propelled over 100 organizations, weaving innovation into Africa's business fabric, and managing $20M+ in VC Funds. Join us in shaping the future</p>
        </div>
       <div>
        <h3 className='text-3xl font-semibold mb-4'>Qiuck Link</h3>
        <ul className='space-y-2 text-lg font-medium' >
            <li>Home</li>
            <li>About Us</li>
            <li>FAQ</li>
            <li>Contact Us</li>
            <li>Login</li>
        </ul>
       </div>
      
        <div className="">
            <div>
              <h3 className="text-3xl font-semibold  mb-4">Contact Information</h3>
              <div className="flex items-center space-x-4 text-lg text-gray-600 mb-3">
                <Mail size={18} className="text-indigo-600"/>
                <span>hello@quizup.com</span>
              </div>
              <div className="flex items-center space-x-4 text-lg text-gray-600 mb-3">
                <Phone size={18} className="text-indigo-600"/>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-4 text-lg text-gray-600">
                <MapPin size={18} className="text-indigo-600"/>
                <span>123 Quiz Street, Knowledge City, QZ 12345</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-semibold text-indigo-800 mb-4">Follow Us</h3>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-300">
                  <Facebook size={24}/>
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-300">
                  <Twitter size={24}/>
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-300">
                  <Instagram size={24}/>
                </a>
              </div>
            </div>
          </div>

            <div className='w-1/5'>
                <p className='mb-8 font-bold'>Stay updated with my latest projects!</p>
                <form action="" className='flex gap-2.5 flex-col'>
                    <input type="mail" placeholder='your email' className='border px-2 py-2 rounded-2xl'/>
                    <button className=" w-1/2 px-8 py-4  font-bold text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300" >Subscribe</button>
                </form>
            </div>

      </div>
      <hr className='border m-6'/>
    </div>
  )
}
