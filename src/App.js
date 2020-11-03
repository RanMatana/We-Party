import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import Login from './Pages/Login';
import Home from './Pages/Home';
import StatisticsLikes from './Pages/StatisticsLikes';
import StatisticsReq from './Pages/StatisticsReq';
import Users from './Pages/Users';
import Places from './Pages/Places';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" >
          <Login />
        </Route>
        <Route path="/home" >
          <Home />
        </Route>
        <Route path="/statisticslikes" >
          <StatisticsLikes />
        </Route>
        <Route path="/statisticsreqs" >
          <StatisticsReq />
        </Route>
        <Route path="/users" >
          <Users />
        </Route>
        <Route path="/places" >
          <Places />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
