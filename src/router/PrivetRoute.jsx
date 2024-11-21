import React from 'react';
import { Navigate, replace, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loading from '../shared/loading/Loading';

const PrivetRoute = ({children}) => {
    const {user,loading} = useAuth();
    const location = useLocation();
    if(loading){
        return <Loading/>
    }

    if(user){
        return children;
    }
    
    
    return <Navigate to={'/sign-in'} state={{form: location.pathname}} replace></Navigate>
};

export default PrivetRoute;