import  { Route, Routes } from "react-router-dom"
import './App.css'
import Login from "./pages/authpage/Login"
import React from "react"
import Home from "./pages/Home"
import Register from "./pages/authpage/Register"
import Forgetpassword from "./pages/authpage/forgetpassword"
// import CreatePassword from "./pages/authpage/CreatePassword"
import Changepassword from "./pages/authpage/changepassword"
// import Welcome from "./userpage/pages/Home"
// import Good from "./userpage/pages/Home2"
// import Group from "./userpage/pages/Home3"
import UserDashboard from "./userpage/pages/Dashboarduser"
import About from "./pages/About"
import Contact from "./pages/Contact"
import AdminDashboard from "./Admin/pages/Dashboard"
import DocumentPage from "./userpage/pages/Document"
import QuizzesPage from "./userpage/pages/Quizpage"
import SettingsPage from "./userpage/pages/Setting"
import AchievementsPage from "./userpage/pages/Achievement"
import QuizHistoryPage from "./userpage/pages/QuizHistory"
import AdminLayout from "./Admin/AdminLayout"
import UsersPage from "./Admin/pages/User"
import AdminQuizzes from "./Admin/pages/Quizze"
import AdminAnalytics from "./Admin/pages/Analytics"
import DocumentsAdmin from "./Admin/pages/Document"
import VerifyOtp from "./pages/authpage/otp"
import QuizStarter from "./userpage/pages/starterpage"
import { useState, useEffect } from "react"
import LoadingScreen from "./component/loadingSping"
import ProtectedRoute from "./route/protectedRoute"
import Unauthorized from "./pages/Unauthorized"
import ScrollToTop from "./component/ScrollToTop"
import NotFound from "./pages/NotFound"
import UserLayout from "./userpage/userLayout"

// import ScrollZoomWrapper from "./component/ScrollZoomWrapper"



function App() {
const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading duration or wait for real data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
   <>
   <ScrollToTop/>
<Routes>
  <Route path="/" element={<Home/>}></Route>
<Route path="/login" element={<Login/>}></Route>
<Route path="/register" element={<Register/>}></Route>
<Route path="/forgetPassword" element={<Forgetpassword/>}></Route>
<Route path="/quiz/start/:quizId" element={<QuizStarter/>}></Route>
<Route path="/changePassword" element={<Changepassword/>}></Route>
<Route path="/about" element={<About/>}></Route>
  <Route path="/contact" element={<Contact/>}></Route>
  <Route path="/verify-otp" element={<VerifyOtp/>}></Route>
    <Route path="/*" element={<NotFound/>}></Route>
    {/* ✅ unauthorized page (can stay here or outside if global) */}
    <Route path="unauthorized" element={<Unauthorized />} />







{/* ✅ userRoute */}
<Route element={<ProtectedRoute allowedRoles={["Student"]} />}>
  <Route path="/user" element={<UserLayout />}>
    {/* index = /user */}
    <Route index element={<UserDashboard />} />

    {/* ✅ nested routes (relative paths) */}
    <Route path="document" element={<DocumentPage />} />
    <Route path="quizzes" element={<QuizzesPage />} />
    <Route path="settings" element={<SettingsPage />} />
    <Route path="achievements" element={<AchievementsPage />} />
    <Route path="history" element={<QuizHistoryPage />} />

    
  </Route>
</Route>





  {/* Admin Routes */}
  {/* <Route element={<ProtectedRoute allowedRoles={["Admin"]}/>}> */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="quizzes" element={<AdminQuizzes />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="document" element={<DocumentsAdmin/>} />
      </Route>
      {/* </Route> */}

</Routes>
   </>
  )
}

export default App


