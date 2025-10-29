import React, { useState, useEffect } from "react";
import Header from "../../component/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthState, registerUser } from "../../redux/Slice/AuthSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Student",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { loading, error, user } = useSelector((state) => state.auth);

  const resetForm = () => {
    setData({
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Student",
    });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    // Must be 8+ chars, contain uppercase, lowercase, number, and special char
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!validatePassword(data.password)) {
      toast.error(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      );
      return;
    }

    console.log("Submitting data:", data);
    dispatch(registerUser(data));
  };

  useEffect(() => {
    let timer;

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

  const toggleToLogin = () => navigate("/login");

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="register-content min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900 px-4 py-16">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-gray-900 dark:text-white">
            Hello! <br />
            Register to get started
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={data.name}
              onChange={handleChange}
              required
              className="border border-gray-300 dark:border-gray-700 rounded-2xl p-3 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* Username */}
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={data.username}
              onChange={handleChange}
              required
              className="border border-gray-300 dark:border-gray-700 rounded-2xl p-3 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={handleChange}
              required
              className="border border-gray-300 dark:border-gray-700 rounded-2xl p-3 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-700 rounded-2xl p-3 pr-10 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={data.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-700 rounded-2xl p-3 pr-10 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3.5 cursor-pointer text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {/* Password requirements */}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Password must include at least 8 characters, one uppercase letter,
              one lowercase letter, one number, and one special character.
            </p>

            <button
              type="submit"
              disabled={loading}
              className={`p-3 rounded-2xl text-lg font-serif text-white transition-all duration-300 ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-700 dark:text-gray-300">
            Already have an account?{" "}
            <span
              onClick={toggleToLogin}
              className="text-blue-600 font-bold cursor-pointer hover:underline"
            >
              Login Now
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
