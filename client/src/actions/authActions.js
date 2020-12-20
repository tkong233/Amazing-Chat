import axios from "axios";
import io from 'socket.io-client';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  SET_SOCKET,
  UNSET_SOCKET,
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  UPDATE_PICTURE,
  DELETE_ACCOUNT
} from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push({    
        pathname: "/login",
        state: true}))
    .catch(err => {
      // console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      // create socket and store in reducer state
      const socket = io();
      socket.emit('sendEmail', { email: userData.email })
      dispatch({
        type: SET_SOCKET,
        payload: socket,
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const setSocket = (email) => {
  const socket = io();
  socket.emit('email', { email });
  return {
    type: SET_SOCKET,
    payload: socket,
  }
}

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = (socket) => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  socket.disconnect();
  dispatch({
    type: UNSET_SOCKET
  })
};

export const resetPassword = (userData, history) => dispatch => {
    axios
    .post("/api/users/reset", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

export const updatePicture = (formData, email) => dispatch => {
  axios.post
  (`/api/users/upload_profile_image/${email}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then(res => {
    dispatch({
      type: UPDATE_PICTURE,
      payload: res.data.user
    })
  }).catch(err => console.log(err));
}

export const deleteAccount = (email) => dispatch => {
  axios
  .delete(`/api/users/profile/${email}`)
  .then(res => dispatch({
    type: DELETE_ACCOUNT, 
  }))
  .catch(err => console.log(err))
  
}

export const doPostStatus = (formData, email, history) => dispatch => {
  axios.post(`/api/users/status/${email}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }).then(res => history.push({    
    pathname: "/dashboard",
    state: true}))
  .catch(err => console.log(err))
}