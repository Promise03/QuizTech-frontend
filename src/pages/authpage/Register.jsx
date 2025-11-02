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
    role: "Student",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, user } = useSelector((state) => state.auth);

  const resetForm = () => {
    setData({
      name: "",
      username: "",
      email: "",
      password: "",
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

    if (!validatePassword(data.password)) {
      toast.error(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      );
      return;
    }

    // ✅ Send only valid fields (confirmPassword removed)
    const { name, username, email, password, role } = data;
    console.log("Submitting data:", { name, username, email, password, role });
    dispatch(registerUser({ name, username, email, password, role }));
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
     <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-indigo-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      
      {/* Left Section - Welcome Message */}
      <div className="hidden md:flex md:w-1/2 justify-center items-center bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-10">
        <div className="max-w-md text-left space-y-6 animate-fade-in">
          <h1 className="text-5xl font-extrabold font-serif leading-tight">
            Join the Family 🌟
          </h1>
          <p className="text-lg opacity-90">
            Create an account and step into a world of knowledge, creativity, and community.
          </p>
          <div className="h-1 w-24 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="flex-1 flex justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-md bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-2xl rounded-3xl p-8 md:p-10 transition-transform duration-500 hover:scale-[1.02]">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-8 text-gray-900 dark:text-white">
            ✨ Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={data.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-700 rounded-2xl p-3 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                value={data.username}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-700 rounded-2xl p-3 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={data.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 dark:border-gray-700 rounded-2xl p-3 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={data.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-2xl p-3 pr-10 bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 cursor-pointer text-gray-500 dark:text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </div>

            {/* Password requirements */}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Password must include at least 8 characters, one uppercase letter, 
              one lowercase letter, one number, and one special character.
            </p>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 rounded-2xl text-lg font-serif text-white transition-all duration-300 shadow-md ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-700 dark:text-gray-300">
            Already have an account?{" "}
            <span
              onClick={toggleToLogin}
              className="text-indigo-600 font-semibold cursor-pointer hover:underline"
            >
              Login Now
            </span>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
