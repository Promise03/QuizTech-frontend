import React from 'react'
import welcome from '/welcome.png'

export default function Home() {
  return (
    <div className='bg-amber-100 w-full h-[100vh]'>
      <div className='flex flex-col w-full h-[70vh] '>
        <img src={welcome} alt="" className='w-full h-full object-fit' />
      </div>
      <div className='bg-white rounded-2xl min-w-11/12 h-[27vh] text-center py-6'>
        <h1 className='text-4xl font-bold mb-2'>Welcome to Quiztech!</h1>
        <p className='text-2xl'>Compete with friends, earn points, and climb the leaderboard in this addictive trivia challenge.</p>
      </div>
    </div>
  )
}
