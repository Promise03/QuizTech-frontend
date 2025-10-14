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



function App() {


  return (
   <>
<Routes>
  <Route path="/" element={<Home/>}></Route>
<Route path="/login" element={<Login/>}></Route>
<Route path="/register" element={<Register/>}></Route>
<Route path="/forgetPassword" element={<Forgetpassword/>}></Route>
<Route path="/quiz/start/:quizId" element={<QuizStarter/>}></Route>
<Route path="/changePassword" element={<Changepassword/>}></Route>
<Route path="/about" element={<About/>}></Route>
  <Route path="/contact" element={<Contact/>}></Route>
  <Route path="/*" element={<Home/>}></Route>
  <Route path="/verify-otp" element={<VerifyOtp/>}></Route>






{/* userRoute */}
{/* <Route path="/welcome" element={<Welcome/>}></Route> */}
{/* <Route path="/good" element={<Good/>}></Route> */}
{/* <Route path="/group" element={<Group/>}></Route> */}
<Route path="/userDashboard" element={<UserDashboard/>}></Route>
<Route path="/Document" element={<DocumentPage/>}></Route>
<Route path="/quizzes" element={<QuizzesPage/>}></Route>
<Route path="/Settings" element={<SettingsPage/>}></Route>
<Route path="/achievements" element={<AchievementsPage/>}></Route>
<Route path="/history" element={<QuizHistoryPage/>}></Route>





  {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="quizzes" element={<AdminQuizzes />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="document" element={<DocumentsAdmin/>} />
      </Route>

</Routes>
   </>
  )
}

export default App


// // import ThemeToggle from './component/themeToggle';

// // function App() {
// //   return (
// //     <div className="min-h-screen bg-bg-light text-text-dark flex flex-col items-center justify-center transition-colors duration-500">
// //       <h1 className="text-3xl font-bold text-primary mb-6">
// //         Pink + Purple Theme 🌸
// //       </h1>

// //       <ThemeToggle />

// //       <div className="mt-8 p-6 bg-card-bg border border-border-color shadow-custom rounded-2xl transition-colors duration-500">
// //         <p className="text-text-light">This card switches theme colors.</p>
// //       </div>
// //     </div>
// //   );
// // }

// export default App;
