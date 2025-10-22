import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const protectedRoute = ({allowedRoles}) => {
const {user} = useSelector((state) => state.login)

if(!user){
    return <Navigate to="/login" replace/>
}
if(!allowedRoles.includes(user.role)){
    return <Navigate to="/Unauthorized" replace/>
}
return <Outlet/>
}

export default protectedRoute