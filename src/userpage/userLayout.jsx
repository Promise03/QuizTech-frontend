import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./conponent/Header";
import UserSidebar from "./conponent/Sidebar";

const UserLayout = () => {
  const [open, setOpen] = useState(window.innerWidth >= 1024);

  const toggle = () => setOpen((prev) => !prev);
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
      <UserSidebar open={open} toggle={toggle} closeOnMobile={closeOnMobile} />

      {/* === Main Content === */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out 
          ${open ? "lg:ml-64" : "lg:ml-"} 
          mt-0 lg:mt-0 overflow-hidden
        `}
      >
        <div className="p-0 ">
          <Header title="User Dashboard" />
          <div className="mt-16">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
