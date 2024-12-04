import React from 'react'
import { useSelector } from 'react-redux';
import {Navigate} from 'react-router-dom';

const PrivateRoute = ({isLoggedIn, children}) => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  if(!currentUser){
    return <Navigate to="/login"/>
  }
  else{
    return <Navigate to="/profile"/>
  }
}

export default PrivateRoute
