import React, { useState, useEffect } from 'react';
import Header from '../../component/Header';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthState, registerUser } from '../../redux/Slice/AuthSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: 'Student',
  });

  const { loading, error, user } = useSelector((state) => state.auth);

  const resetForm = () => {
    setData({
      name: '',
      username: '',
      email: '',
      password: '',
      role: 'Student',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting data:', data);
    dispatch(registerUser(data));
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log("Effect triggered:", { user, error });
    

    let timer;

    // ✅ Check for backend structure
    if (user && user.success) {
      toast.success(user.message || "Registration successful!");
      resetForm();
      timer = setTimeout(() => {
        dispatch(clearAuthState());
        navigate("/login");
      }, 2000);
    }

    if (error) {
      toast.error(error);
      dispatch(clearAuthState());
    }

    return () => clearTimeout(timer);
  }, [user, error, navigate, dispatch]);

  const toggleToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <Header />
      <div className="register-content h-[100vh] w-full flex items-center justify-center">
        <div className="shadow-[var(--shadow)] w-full max-w-md p-8 rounded-2xl">
          <ToastContainer />
          <h1 className="text-left text-3xl font-serif font-bold mb-6">
            Hello! Register to get started
          </h1>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            <input
              type="text"
              name="name"
              className="border rounded-2xl p-3 "
              placeholder="Enter your full name"
              value={data.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="username"
              className="border rounded-2xl p-3 "
              placeholder="Enter your username"
              value={data.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              className="border rounded-2xl p-3 "
              placeholder="Enter your email"
              value={data.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              className="border rounded-2xl p-3 "
              placeholder="Enter your password"
              value={data.password}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="p-3 rounded-2xl text-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <p className="text-center mt-3">
            Already have an account?{' '}
            <span
              onClick={toggleToLogin}
              className="text-blue-600 font-bold cursor-pointer"
            >
              Login Now
            </span>
          </p>
        </div>
      </div>
    </>
  );
}


