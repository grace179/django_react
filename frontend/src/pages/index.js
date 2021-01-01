import React from 'react';
import { Route } from 'react-router-dom';
import About from './About';
import AccountsRoutes from './accounts';
import Home from './Home';
import PostNew from './PostNew';
import LoginRequireRoute from './utils/LoginRequireRoute';

function Root(){
  return (
  <>
    {/* 최상위 컴포넌트 */}
    <LoginRequireRoute exact path="/" component={Home}/>
    <Route exact path="/about" component={About}/>
    <LoginRequireRoute exact path="/posts/new" component={PostNew}/>
    <Route path="/accounts" component={AccountsRoutes}/>
  </>);
}

export default Root;