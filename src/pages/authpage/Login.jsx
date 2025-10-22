import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { loginUser } from "../../redux/Slice/LoginSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, tempToken } = useSelector((state) => state.login);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setCredentials({
      email: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending Payload:", credentials);
    dispatch(loginUser(credentials));
  };

  useEffect(() => {
    if (tempToken) {
      toast.success("Redirecting....");
      resetForm();
      const timer = setTimeout(() => {
        navigate("/verify-otp");
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (error) {
      toast.error(error);
    }
  }, [error, tempToken, navigate]);

  const toggleToRegister = () => navigate("/register");
  const forgetPassword = () => navigate("/forgetPassword");

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="login-content min-h-screen w-full flex justify-center items-center py-24 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h1 className="text-left text-3xl md:text-4xl font-serif font-bold mb-8 text-gray-900 dark:text-white">
            Welcome back! <br /> Glad to see you again!
          </h1>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            <input
              type="text"
              name="email"
              className="border border-gray-300 dark:border-gray-700 rounded-2xl p-3 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              className="border border-gray-300 dark:border-gray-700 rounded-2xl p-3 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />

            <p
              className="text-right text-blue-600 hover:underline cursor-pointer text-sm"
              onClick={forgetPassword}
            >
              Forgot Password?
            </p>

            <button
              disabled={loading}
              className={`p-3 rounded-2xl text-lg text-white font-serif transition-all duration-300 ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-700 dark:text-gray-300">
            Don’t have an account yet?{" "}
            <span
              onClick={toggleToRegister}
              className="text-blue-600 font-bold cursor-pointer hover:underline"
            >
              Register Now
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
