import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import { useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { loginUser } from '../../redux/Slice/LoginSlice'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {loading, error, tempToken} =useSelector((state) => state.login)
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) =>{
    const { name, value} = e.target;
    setCredentials((prev) => ({...prev, [name]: value}));
  }

  const resetForm = () => {
    setCredentials({
      email: '',
      password: '',
    });
  };

  const handleSubmit = async (e) =>{ 
    e.preventDefault();
      // ✅ ADD THIS LINE
  console.log('Sending Payload:', credentials);
    dispatch(loginUser(credentials))
  }

  useEffect(()=>{
    if(tempToken) {
      toast.success("Redirecting....?");
      resetForm();
      const timer = setTimeout(()=>{
        navigate("/verify-otp");
      }, 3000)
      return () => clearTimeout(timer)
    }
    if (error){
      toast.error(error)
    }
  },[error, tempToken, navigate])

  const toggleToRegister = () => {
    navigate('/register')
  }

  const forgetPassword = () => {
    navigate('/forgetPassword')
  }
  return (
    <>
     <Header/>
     <ToastContainer/>
   <div className='login-content h-[100vh] w-full py-32'>
    
    <div className=' w-1/3  px-auto mx-auto  p-4  shadow-[var(--shadow)]'>
    <h1 className='text-left text-4xl font-serif font-bold my-6'>Welcome back! Glad to see you, Again!</h1>
      <form onSubmit={handleSubmit} className='w-full flex flex-col  gap-5    '>
        <input type="text" name="email"  className='border rounded-2xl p-3   ' placeholder='Enter your email' onChange={handleChange} required />
        <input type="password" name="password"  className='border rounded-2xl p-3 ' placeholder='Enter your password' onChange={handleChange}/>
        <p className='text-right' onClick={forgetPassword}>Forget Password?</p>

<button 
    // 1. Check the 'loading' state to disable the button
    disabled={loading} 
    
    // 2. Adjust styling when loading (optional, but helpful)
    className={`
        p-3 rounded-2xl text-lg text-white font-serif
        ${loading 
            ? 'bg-gray-500 cursor-not-allowed' // Use a muted color and change cursor when loading
            : 'bg-blue-300 hover:bg-blue-500'   // Original colors
        }
    `}
>
    {/* 3. Change button text based on the 'loading' state */}
    {loading ? 'Logging in...' : 'Login'}
</button>
      </form>
       <p className='text-center mt-8'>Don't have account yet <span onClick={toggleToRegister} className='text-blue-600 font-bold cursor-pointer'>Register Now</span></p>
    </div>
   </div>
    </>
  )
}
