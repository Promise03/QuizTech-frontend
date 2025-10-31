import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/authpage/Login";
import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Register from "./pages/authpage/Register";
import Forgetpassword from "./pages/authpage/forgetpassword";
import Changepassword from "./pages/authpage/changepassword";
import UserDashboard from "./userpage/pages/Dashboarduser";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./Admin/pages/Dashboard";
import DocumentPage from "./userpage/pages/Document";
import QuizzesPage from "./userpage/pages/Quizpage";
// import SettingsPage from "./userpage/pages/Setting";
import AchievementsPage from "./userpage/pages/Achievement";
import QuizHistoryPage from "./userpage/pages/QuizHistory";
import AdminLayout from "./Admin/AdminLayout";
import UsersPage from "./Admin/pages/User";
import AdminQuizzes from "./Admin/pages/Quizze";
import AdminAnalytics from "./Admin/pages/Analytics";
import DocumentsAdmin from "./Admin/pages/Document";
// import VerifyOtp from "./pages/authpage/otp";
import QuizStarter from "./userpage/pages/starterpage";
import LoadingScreen from "./component/loadingSping";
import ProtectedRoute from "./route/protectedRoute";
import Unauthorized from "./pages/Unauthorized";
import ScrollToTop from "./component/ScrollToTop";
import NotFound from "./pages/NotFound";
import UserLayout from "./userpage/userLayout";
import "aos/dist/aos.css";
import AOS from "aos";

function App() {
  const [loading, setLoading] = useState(true);

  // First useEffect: Handle loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Second useEffect: Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    AOS.refresh();
  }, []);

  // Early return for loading screen
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetPassword" element={<Forgetpassword />} />
        <Route path="/quiz/start/:quizId" element={<QuizStarter />} />
        <Route path="/changePassword" element={<Changepassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/verify-otp" element={<VerifyOtp />} /> */}
        <Route path="/*" element={<NotFound />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* User Routes */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="document" element={<DocumentPage />} />
          <Route path="quizzes" element={<QuizzesPage />} />
          {/* <Route path="settings" element={<SettingsPage />} /> */}
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="history" element={<QuizHistoryPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="quizzes" element={<AdminQuizzes />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="document" element={<DocumentsAdmin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;