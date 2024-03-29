import { useLocation, Navigate, Outlet } from "react-router-dom"
import jwt_decode from "jwt-decode";

import {useAuth} from "@/store"


function RequireAuth ({allowedRole}) {
    const {auth} = useAuth();
    const location = useLocation()

    // decode token from auth context
    const decode = auth?.token
     ? jwt_decode(auth.token)
     : {}

     let userRole = decode?.role_code

    //  userRole = "R1";
    

    return (
        !!allowedRole?.find(role => userRole === role)
        ? <Outlet/>
        : Object.keys(auth).length !== 0
            ? <Navigate to="/unauthorized" />
            : <Navigate to="/login" />
       )
    
}

export default RequireAuth