import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App'; //todo: notice how we can change the location of our root component
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      {/* example of using react bootstrap */}
      <Nav justify variant="tabs" activeKey="/">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav.Item>
      </Nav>

      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


function Register() {
  return (
    <fieldset>
      <legend>Create new user</legend>
      <input id="username" placeholder="email" />
      <input id="password" type="password" placeholder="password" />
      <button id="register">Register</button>
      <span id='status'></span>
      <div>
        <h4>Raw response body: </h4>
        <pre id='raw-response'></pre>
      </div>
    </fieldset>
  );
}

function Login() {
  return (
    <div>
      <h2>TODO: Add login form and make sure it is working</h2>
    </div>
  );
}