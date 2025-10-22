import React from 'react'
import {Phone, Map, MessagesSquare } from 'lucide-react';

export default function Contact() {
  return (
    <div className='py-20 px-0 contact-content '>
    
    <section className='m-7'>
        <div  >
            <div className='text-center mb-12'>
                <h2 className='text-4xl font-semibold mb-4 '>Get In Touch</h2>
                <p className='max-w-150 mx-auto text-[#6c757d]'>Have questions or feedback? We'd love to hear from you!</p>
            </div>
            
            <div className='flex gap-12'>
                <div className='flex-1'>
                    <h2 className='text-4xl mb-5'>Contact Us</h2>
                    <p className='mb-7 text-[#6c757d]'>Our team is here to answer any questions you may have about QuizMaster. Reach out to us and we'll respond as soon as we can.</p>
                    
                    <div className='mb-7'>
                        <div className='flex items-center mb-3.5 gap-4' >
                          <Map className='text-indigo-600'/>
                            <span>123 Quiz Street, Knowledge City, Edutopia</span>
                        </div>
                        
                        <div className="flex items-center mb-3.5 gap-4">
                          <Phone className='text-indigo-600'/>
                            <span>+1 (555) 123-4567</span>
                        </div>
                        
                        <div className="flex items-center mb-3.5 gap-4">
                          <MessagesSquare className='text-indigo-600'/>
                            <span>info@quizmaster.com</span>
                        </div>
                    </div>
                    
                    {/* <div className="">
                         <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-300">
                  <Facebook size={32}/>
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-300">
                  <Twitter size={32}/>
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors duration-300">
                  <Instagram size={32}/>
                  </a>
                    </div> */}
                </div>
                
                <div className='flex-1'>
                    <form>
                        <div className='mb-5' >
                            <label for="name" className='block mb-2'>Full Name</label>
                            <input type="text"  placeholder="Your Name " className='w-full px-3 py-3.5 rounded-sm text-[16px] border-[#ddd] border'/>
                        </div>
                        
                        <div >
                            <label for="email" className='block mb-2'>Email Address</label>
                            <input type="email"  placeholder="Your Email" className='w-full px-3 py-3.5 rounded-sm text-[16px] border-[#ddd] border'/>
                        </div>
                        
                        <div >
                            <label for="subject" className='block mb-2'>Subject</label>
                            <input type="text"  placeholder="Subject" className='w-full px-3 py-3.5 rounded-sm text-[16px] border-[#ddd] border'/>
                        </div>
                        
                        <div >
                            <label for="message" className='block mb-2'>Message</label>
                            <textarea  placeholder="Your Message" className='min-h-38 w-full px-3 py-3.5 rounded-sm text-[16px] border border-[#ddd]'></textarea>
                        </div>
                        
                        <button type="submit" className='btn'>Send Message</button>
                    </form>
                </div>
            </div>
        </div>
        
    </section>
    </div>
  )
}
