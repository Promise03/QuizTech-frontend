import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import AdminHeader from "./Component/Header";
import AdminSidebar from "./Component/Sidebar";

const AdminLayout = () => {
  // 1. STATE and LOGIC (Moved from AdminSidebar)
    const [open, setOpen] = useState(window.innerWidth >= 1024);

    const toggle = () => setOpen(!open);
    
    const closeOnMobile = () => {
        if(window.innerWidth < 1024){
            setOpen(false)
        }
    }
    
    useEffect(() => {
        const handleResize =() => {
            if (window.innerWidth >= 1024){
                setOpen(true)
            }else{
                setOpen(false)
            }
        }
    
        window.addEventListener("resize",handleResize )
    
        return () => window.removeEventListener('resize', handleResize);
    }, []);
  return (
   <div className="flex min-h-screen">
            <AdminSidebar 
                open={open} 
                toggle={toggle} 
                closeOnMobile={closeOnMobile} 
            />

      {/* MAIN AREA */}
      {/* <div className="flex-1 flex flex-col ">
        {/* HEADER */}
        {/* <AdminHeader /> */ }

        {/* PAGE CONTENT */}
        <main className={`
        p-8 
        flex-1 
        overflow-y-auto 
        
        /* 1. Mobile Top Margin: Adjust for the mobile toggle button/header */
        lg:mt-16 mt-0 
        
        /* 2. Desktop Margin: This is the critical, dynamic part */
        lg:${open ? "ml-64" : "lg:ml-20"} 
        
        /* 3. Transition: Ensure the content slides smoothly */
        transition-all duration-300 ease-in-out
    `}>
      <div className="lg:p-0 p-8">
                    {/* Your Header component goes first */}
                    <AdminHeader /> 
                    
                    {/* The rest of the page content follows */}
                    <div className="mt-2"> {/* Add a margin below the header */}
                        <Outlet /> 
                    </div>
                </div>
          {/* <Outlet /> */}
        </main>
      </div>
    // </div>
  );
};

export default AdminLayout;
