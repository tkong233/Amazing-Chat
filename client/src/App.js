import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser, setSocket } from "./actions/authActions";
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux";
import {store, persistor} from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Reset from "./components/auth/Reset";
import Profile from "./components/Profile";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
// import VideoChat from "./components/videoChat/VideoChat";
import ViewStatus from "./components/user_status/ViewStatus";
import PostStatus from "./components/user_status/PostStatus";

import GlobalStyles from './components/global/GlobalStyles';

import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(setSocket(decoded.email));
  console.log('socket set?', store.getState().chat);
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser(store.getState().chat.socket));

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <div data-test="AppComponent">
      <GlobalStyles />
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/reset" component={Reset} />
            {/* <Route exact path="/chat" component={Chat}/> */}
            {/* <Route exact path="/profile" component={Profile} /> */}
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              {/* <PrivateRoute exact path="/video_chat" component={VideoChat} /> */}
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/post_status" component={PostStatus} />
              <PrivateRoute exact path="/status" component={ViewStatus} />
            </Switch>
          </div>
        </Router>
        </PersistGate>
      </Provider>
      </div>
    );
  }
}
export default App;
