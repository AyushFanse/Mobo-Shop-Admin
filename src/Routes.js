import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Routes.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Target from "./Target";

function App(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route path="/home">
          <Target/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
