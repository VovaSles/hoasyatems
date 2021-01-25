import { useState } from 'react';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import MessangesPage from './pages/MessagesPage/MessagesPage';
import VotingsPage from './pages/VotingsPage/VotingsPage';
import Parse from 'parse';
import UsersPage from './pages/UsersPage/UsersPage';
import UserModel from './model/UserModel';


function App() {
  const [activeUser, setActiveUser] = useState(
    Parse.User.current() ? new UserModel(Parse.User.current()) : null);   // During development it's conveient to be logged in by default  

  function handleLogout() {
    setActiveUser(null);
    Parse.User.logOut();
  }

  function handleLogin(loggedinUser) {
    setActiveUser(loggedinUser);
  }

  return (
    <Router>
      <Switch>
      <Route exact path="/hoasystems/"><HomePage activeUser={activeUser} onLogout={handleLogout}/></Route>
        <Route exact path="/hoasystems/login"><LoginPage activeUser={activeUser} onLogin={handleLogin}/></Route>
        <Route exact path="/hoasystems/signup"><SignupPage activeUser={activeUser} onLogin={handleLogin}/></Route>
      {/*   protected routs */}
        <Route exact path="/hoasystems/users"><UsersPage activeUser={activeUser} onLogout={handleLogout}/></Route> 
        <Route exact path="/hoasystems/messages"><MessangesPage activeUser={activeUser} onLogout={handleLogout}/></Route> 
        <Route exact path="/hoasystems/votings"><VotingsPage activeUser={activeUser} onLogout={handleLogout}/></Route> 
      </Switch>
    </Router>
  );
}

export default App;
