import React from 'react'
import { useNavigate } from 'react-router-dom';
export default function Forgetpassword() {
     const navigate = useNavigate();

     const toggleToLogin = () => {
        navigate('/login')
     }
  return (
    <div className='bg-amber-100 h-[100vh] w-full py-18'>
          <div className='shadow w-1/3  px-auto mx-auto  p-4 bg-inherit/50'>
          <h1 className=' text-4xl font-serif font-bold my-3'>Forget password</h1>
          <p className='mb-4'>Don't worry! it's occur. Pls enter the email address linked with your account</p>
            <form action="" className='w-full flex flex-col  gap-5    '>
              <input type="text" name="email"  className='border-none rounded-2xl p-3  bg-white ' placeholder='Enter your email' />
              <button className='bg-blue-300 p-3 rounded-2xl text-lg text-white font-serif hover:text-lg hover:bg-blue-500'>Send Code</button>
            </form>
             <p className='text-center mt-8'>Remember Password<span onClick={toggleToLogin} className='text-blue-600 font-bold'>login Now</span></p>
          </div>
    </div>
  )
}
