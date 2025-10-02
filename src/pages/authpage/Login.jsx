import React from 'react'
import Header from '../../component/Header'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const toggleToRegister = () => {
    navigate('/register')
  }

  const forgetPassword = () => {
    navigate('/forgetPassword')
  }
  return (
    <>
   <div className='bg-amber-100 h-[100vh] w-full py-32'>
     <Header/>
    <div className='shadow w-1/3  px-auto mx-auto  p-4 bg-inherit/50'>
    <h1 className='text-left text-4xl font-serif font-bold my-6'>Welcome back! Glad to see you, Again!</h1>
      <form action="" className='w-full flex flex-col  gap-5    '>
        <input type="text" name="email"  className='border-none rounded-2xl p-3  bg-white ' placeholder='Enter your email' />
        <input type="password" name=""  className='border-none rounded-2xl p-3 bg-white' placeholder='Enter your password'/>
        <p className='text-right' onClick={forgetPassword}>Forget Password?</p>
        <button className='bg-blue-300 p-3 rounded-2xl text-lg text-white font-serif hover:text-lg hover:bg-blue-500'>Login</button>
      </form>
       <p className='text-center mt-8'>Don't have account yet <span onClick={toggleToRegister} className='text-blue-600 font-bold cursor-pointer'>Register Now</span></p>
    </div>
   </div>
    </>
  )
}
