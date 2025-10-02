import React from 'react'
import good from '/goods.png'
// import goodstroke from '/good-stroke.png'

export default function Home2() {
  return (
    <div>
       <div className='bg-amber-100 w-full h-[100vh]'>
            <div className='flex flex-col w-full h-[70vh] relative '>
              <img src={good} alt="" className='w-full h-full object-fit' />
              {/* <img src={goodstroke} alt="" className='absolute top-0 w-full right-0  object-fit h-fit' /> */}
            </div>
            <div className='bg-white rounded-2xl min-w-11/12 h-[27vh] text-center py-6'>
              <h1 className='text-4xl font-bold mb-2'>The Ultimate Trivia Challenge</h1>
              <p className='text-2xl'>Put your knowledge to the test and prove your expertise across a wide range of topics in this engaging game.</p>
            </div>
          </div>
    </div>
  )
}
