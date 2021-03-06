import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';
import ContactState from './contexts/contact/ContactState';
import AuthState from './contexts/auth/AuthState';
import AlertState from './contexts/alert/AlertState';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;
