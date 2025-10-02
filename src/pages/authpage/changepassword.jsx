import React from 'react'
import success from '/Successmark.png'

export default function Changepassword() {
  return (
    <div className='bg-amber-100 h-[100vh] w-full py-18'>
        <div className='w-1/4 px-2 mx-auto py-7 shadow'>
        <img src={success} alt="" className='w-1/3 mx-auto' />
        <h1 className='text-center font-bold text-3xl'>Password Change!</h1>
        <p className='text-center my-4'>Your password has change successfully.</p>
        <button className='bg-blue-300 p-3 rounded-2xl text-lg text-white font-serif hover:text-lg hover:bg-blue-500 w-full'>Back to login</button>
         </div>

    </div>
  )
}
