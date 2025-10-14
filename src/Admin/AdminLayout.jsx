import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./Component/Header";
import AdminSidebar from "./Component/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen ">
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col ">
        {/* HEADER */}
        <AdminHeader />

        {/* PAGE CONTENT */}
        <main className="p-8 flex-1 overflow-y-auto ml-64 mt-18 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
