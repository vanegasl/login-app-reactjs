import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';
import logo from './humana-logo.png';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { UserProfile, getToken, removeUserSession, setUserSession } from './Utils/Common';

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    const theHeaders = {
      method: 'get',
      headers: { 
        'Content-Type' : 'application/json',    
        'Authorization' : 'Bearer '+ token
      }
    };

    fetch('http://localhost:9080/cortex/profiles/mobee/default',theHeaders)
      .then(res => res.json())
      .then((data) => {     
        const myObjStr = JSON.stringify(data);
        const myJson = JSON.parse(myObjStr);    
        setUserSession(myJson['given-name']+' '+myJson['family-name']);   
        UserProfile.setName(myJson['given-name']+' '+myJson['family-name']);   
        setAuthLoading(false);  
      }).catch(error => {
        removeUserSession();
        setAuthLoading(false);
      });



  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">            
            <NavLink exact activeClassName="active" to="/"><img src={logo} alt="Logo" /></NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
            <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small>{ UserProfile.getName()   }</small>
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
