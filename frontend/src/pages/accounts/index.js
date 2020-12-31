import React from 'react';
import { Route } from 'react-router-dom';
import LoginRequireRoute from '../utils/LoginRequireRoute';
import Login from './Login';
import Profile from './Profile';
import Signup from './Signup';

function AccountsRoutes({match}) {
  return (
    <>
     <LoginRequireRoute
        exact path={match.url + "/profile"} 
        component={Profile}/>
     <Route exact path={match.url + "/login"} component={Login}/> 
     <Route exact path={match.url + "/signup"} component={Signup}/> 

    </>
  )
}

export default AccountsRoutes;
