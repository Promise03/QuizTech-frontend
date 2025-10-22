import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./Component/Header";
import AdminSidebar from "./Component/Sidebar";

const AdminLayout = () => {
  const [open, setOpen] = useState(window.innerWidth >= 1024);

  const toggle = () => setOpen(!open);
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
    <div className="flex min-h-screen">
      <AdminSidebar open={open} toggle={toggle} closeOnMobile={closeOnMobile} />

      {/* MAIN AREA */}
      <main
        className={`
          flex-1 flex flex-col overflow-y-auto p-8
          mt-0 lg:mt-16
          transition-all duration-300 ease-in-out
          ${open ? "lg:ml-64" : "lg:ml-20"}
        `}
      >
        <div className="lg:p-0 p-8">
          <AdminHeader />
          <div className="mt-2">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
