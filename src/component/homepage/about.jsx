import React from 'react'
import about from '/about.jpg'

export default function About() {
  return (
    <div className='about-content text-white py-20 px-0'>
 <div className='flex items-center gap-12 m-7'>
         <div className='flex-1'>
        <h2 className=' text-4xl'>About QuizTech</h2>
        <p className='mb-5 '>QuizTech was founded in 2020 with a simple mission: to make learning fun and accessible to everyone. We believe that knowledge should be engaging, interactive, and rewarding.</p>
        <p className='mb-5 '>Our team of educators, designers, and developers work tirelessly to create high-quality quizzes that challenge and entertain users of all ages and knowledge levels.</p>
        <p className='mb-5 '>With over 500,000 active users and 10,000+ quizzes, we're proud to be one of the fastest-growing quiz platforms on the web.</p>
        <button className='bg-blue-700 rounded-3xl p-5'>Get Strated</button>
      </div>
      <div className='flex-1 text-center rounded-tl-4xl rounded-br-4xl shadow-[var(--shadow)] abt-img'>
      <img src={about} alt="" className='rounded-tl-4xl rounded-br-4xl ' />
      </div>
 </div>
 
    </div>
  )
}
