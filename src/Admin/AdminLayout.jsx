import React, { useState, useEffect } from "react";
import AdminHeader from "./Component/Header"
import AdminSidebar from "./Component/Sidebar"
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [open, setOpen] = useState(window.innerWidth >= 1024);

  const toggleSidebar = () => setOpen((prev) => !prev);

  const closeOnMobile = () => {
    if (window.innerWidth < 1024) setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* === Sidebar === */}
      <AdminSidebar open={open} toggle={toggleSidebar} closeOnMobile={closeOnMobile} />

      {/* === Main Content Area === */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          open && window.innerWidth >= 1024 ? "lg:ml-64" : "ml-0"
        }`}
      >
        <AdminHeader
          sidebarOpen={open}
          toggleSidebar={toggleSidebar}
        />

        <main className="mt-16 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
