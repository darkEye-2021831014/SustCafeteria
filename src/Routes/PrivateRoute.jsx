import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthContext/AuthContext';


const PrivateRoute = ({children}) => {
    const location=useLocation();
    console.log(location);
    const {user,loading}=use(AuthContext);
    if(loading){
        return <span className="loading loading-spinner text-success"></span>
    }
    if(user){
        return children;
    }
    console.log("from private router",user)
    return <Navigate state={location?.pathname} to="/login"></Navigate>
};

export default PrivateRoute;