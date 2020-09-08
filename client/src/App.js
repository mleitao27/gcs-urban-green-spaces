// Imports
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import './extension/Extension.css';

import Header from './components/layout/Header';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import AdminPage from './pages/AdminPage';
import ResearcherPage from './pages/ResearcherPage';

const App = props => {

  // User session states
  const [logged, setLogged] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userType, setUserType] = useState('');

  // Changes logged state
  const changeLoggedState = (state, email, type) => {
    setLogged(state);
    setUserEmail(email);
    setUserType(type);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userType', type);
  };

  // Runs after every render
  useEffect(() => {
    // If email previously stored in cache
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      // Get user session from the server cache
      axios.get(`http://localhost:3000/${userEmail}`)
      .then(res => {
        // Set state if user in cache
        setLogged(true);
        setUserEmail(localStorage.getItem('userEmail'));
        setUserType(localStorage.getItem('userType'));
      })
      .catch(error => {
        // If user not in cache reset state
        console.log(error);
        setLogged(false);
        setUserEmail('');
        setUserType('');
        localStorage.setItem('userEmail', '');
        localStorage.setItem('userType', '');
      });
    }
  });

  return (
    <Router>
      <div>
        <Header isLogged={logged} />
        <Route exact path='/' render={props => <LandingPage {...props} isLogged={logged} userType={userType} />} />
        <Route path='/register' component={RegisterPage} />
        <Route path='/login' render={props => <LoginPage {...props} onLogin={changeLoggedState} isLogged={logged} />} />
        <Route path='/logout' render={props => <LogoutPage {...props} onLogout={changeLoggedState} isLogged={logged} userEmail={userEmail} />} />
        <Route path='/admin' render={props => <AdminPage {...props} onLogout={changeLoggedState} isLogged={logged} adminEmail={userEmail} />} />
        <Route path='/researcher' render={props => <ResearcherPage {...props} onLogout={changeLoggedState} isLogged={logged} userEmail={userEmail} />} />
      </div>
    </Router>
  );
}

export default App;