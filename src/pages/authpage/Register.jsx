import React from 'react'
import Header from '../../component/Header'
import { useNavigate } from 'react-router-dom'

export default function Register() {
     const navigate = useNavigate();

     const toggleToLogin = () => {
        navigate('/login')
     }
  return (
   <>
   <div className='bg-amber-100 h-[100vh] w-full py-18'>
     <Header/>
    <div className='shadow w-1/3  px-auto mx-auto  p-4 bg-inherit/50'>
    <h1 className='text-left text-4xl font-serif font-bold my-6'>Hello! Register to get started</h1>
      <form action="" className='w-full flex flex-col  gap-5    '>
        <input type="text" name="name"  className='border-none rounded-2xl p-3  bg-white ' placeholder='Enter your full name' />
        <input type="password" name="Username"  className='border-none rounded-2xl p-3 bg-white' placeholder='Enter your username'/>
         <input type="text" name="email"  className='border-none rounded-2xl p-3  bg-white ' placeholder='Enter your email' />
        <input type="password" name="password"  className='border-none rounded-2xl p-3 bg-white' placeholder='Enter your password'/>
        <button className='bg-blue-300 p-3 rounded-2xl text-lg text-white font-serif hover:text-lg hover:bg-blue-500'>Register</button>
      </form>
       <p className='text-center '>Already have an account <span onClick={toggleToLogin} className='text-blue-600 font-bold'>login Now</span></p>
    </div>
   </div>
    </>
  )
}
