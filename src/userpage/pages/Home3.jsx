import React from 'react'
import group from '/Group.png'
// import goodstroke from '/good-stroke.png'

export default function Home3() {
  return (
    <div>
       <div className='bg-amber-100 w-full h-[100vh]'>
            <div className='flex flex-col w-full h-[70vh] relative '>
              <img src={group} alt="" className='w-full h-full object-fit' />
              {/* <img src={goodstroke} alt="" className='absolute top-0 w-full right-0  object-fit h-fit' /> */}
            </div>
            <div className='bg-white rounded-2xl min-w-11/12 h-[27vh] text-center py-6'>
              <h1 className='text-4xl font-bold mb-2'>Test Your Knowledge with Quiztech</h1>
              <p className='text-2xl'>Quiztech is the perfect app to challenge yourself and your friends, with endless trivia fun at your fingertips.</p>
            </div>
          </div>
    </div>
  )
}
