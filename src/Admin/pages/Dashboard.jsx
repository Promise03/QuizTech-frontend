import React from 'react';
import AdminHeader from '../Component/Header';
import AdminSidebar from '../Component/Sidebar';
import { Users, FileQuestion, LineChart, Clock } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <AdminHeader title="Dashboard" />
        <div className="p-10">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users size={28} className="text-blue-600"/>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-600">Total Users</h3>
                <p className="text-3xl font-bold text-gray-900">1,250</p>
              </div>
            </div>
            {/* ... other stat cards */}
          
          <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full">
              <FileQuestion size={28} className="text-green-600"/>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-600">Total Quizzes</h3>
              <p className="text-3xl font-bold text-gray-900">45</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-full">
              <LineChart size={28} className="text-red-600"/>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-600">Quizzes Taken</h3>
              <p className="text-3xl font-bold text-gray-900">8,900</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock size={28} className="text-yellow-600"/>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-600">New Users (30d)</h3>
              <p className="text-3xl font-bold text-gray-900">125</p>
            </div>
          
        </div>
          </div>
          {/* Recent Activity Table */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent User Activity</h3>
            {/* ... table content */}
             <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">John Doe</td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">Completed "History Quiz"</td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">2 hours ago</td>
                </tr>
                <tr>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">Jane Smith</td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">Signed up</td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">5 hours ago</td>
                </tr>
                <tr>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">Alex Chen</td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">Took "Science Quiz"</td>
                  <td className="px-5 py-5 border-b border-gray-200 text-sm">1 day ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


// import React from 'react';
// import { Settings, LayoutDashboard, Users, FileQuestion, BarChart, LogOut, LineChart, Clock } from 'lucide-react';

// const AdminDashboard = () => {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-indigo-900 text-white flex flex-col p-6">
//         <div className="flex items-center space-x-3 mb-10">
//           <Settings size={32}/>
//           <span className="text-2xl font-bold">Admin Panel</span>
//         </div>
//         <nav className="flex-1 space-y-2">
//           <a href="#" className="flex items-center space-x-3 p-3 rounded-lg bg-indigo-800 text-white hover:bg-indigo-700 transition-colors duration-200">
//             <LayoutDashboard size={24}/>
//             <span>Dashboard</span>
//           </a>
//           <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-indigo-200 hover:bg-indigo-800 transition-colors duration-200">
//             <Users size={24}/>
//             <span>Users</span>
//           </a>
//           <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-indigo-200 hover:bg-indigo-800 transition-colors duration-200">
//             <FileQuestion size={24}/>
//             <span>Quizzes</span>
//           </a>
//           <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-indigo-200 hover:bg-indigo-800 transition-colors duration-200">
//             <BarChart size={24}/>
//             <span>Analytics</span>
//           </a>
//         </nav>
//         <div className="mt-auto">
//           <a href="#" className="flex items-center space-x-3 p-3 rounded-lg text-red-300 hover:bg-red-800 transition-colors duration-200">
//             <LogOut size={24}/>
//             <span>Logout</span>
//           </a>
//         </div>
//       </div>
      
//       {/* Main Content */}
//       <div className="flex-1 p-10 overflow-auto">
//         <header className="flex justify-between items-center mb-10">
//           <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
//           <div className="flex items-center space-x-4">
//             <span className="text-gray-600">Welcome, Admin</span>
//             <img src="https://via.placeholder.com/40" alt="Admin Profile" className="rounded-full"/>
//           </div>
//         </header>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
//             <div className="p-3 bg-blue-100 rounded-full">
//               <Users size={28} className="text-blue-600"/>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-600">Total Users</h3>
//               <p className="text-3xl font-bold text-gray-900">1,250</p>
//             </div>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
//             <div className="p-3 bg-green-100 rounded-full">
//               <FileQuestion size={28} className="text-green-600"/>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-600">Total Quizzes</h3>
//               <p className="text-3xl font-bold text-gray-900">45</p>
//             </div>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
//             <div className="p-3 bg-red-100 rounded-full">
//               <LineChart size={28} className="text-red-600"/>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-600">Quizzes Taken</h3>
//               <p className="text-3xl font-bold text-gray-900">8,900</p>
//             </div>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
//             <div className="p-3 bg-yellow-100 rounded-full">
//               <Clock size={28} className="text-yellow-600"/>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold text-gray-600">New Users (30d)</h3>
//               <p className="text-3xl font-bold text-gray-900">125</p>
//             </div>
//           </div>
//         </div>

//         {/* Recent Activity Table */}
//         <div className="bg-white p-8 rounded-xl shadow-md">
//           <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent User Activity</h3>
//           <div className="overflow-x-auto">
//             <table className="min-w-full leading-normal">
//               <thead>
//                 <tr>
//                   <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
//                     User
//                   </th>
//                   <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
//                     Action
//                   </th>
//                   <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
//                     Time
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="px-5 py-5 border-b border-gray-200 text-sm">John Doe</td>
//                   <td className="px-5 py-5 border-b border-gray-200 text-sm">Completed "History Quiz"</td>
//                   <td className="px-5 py-5 border-b border-gray-200 text-sm">2 hours ago</td>
//                 </tr>
//                 <tr>
//                   <td className="px-5 py-5 border-b border-gray-200 text-sm">Jane Smith</td>
//                   <td className="px-5 py-5 border-b border-gray-200 text-sm">Signed up</td>
//                   <td className="px-5 py-5 border-b border-gray-200 text-sm">5 hours ago</td>
//                 </tr>
//                 <tr>
//                   <td className="px-5 py-5 border-b border-gray-200 text-sm">Alex Chen</td>
//                   <td className="px-5 py-5 border-b border-gray-200 text-sm">Took "Science Quiz"</td>
//                   <td className="px-5 py-5 border-b border-gray-200 text-sm">1 day ago</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;