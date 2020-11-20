import axios from "axios";

import { GET_CONTACTS, GET_SUGGESTION, ADD_CONTACT, DELETE_CONTACT } from "./types";

// Get suggestion
export const getSuggestion = (email) => dispatch => {
  axios
    .get(`/suggestion/${email}`)
    .then(res => {
      dispatch({
        type: GET_SUGGESTION,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err);
    })
}

export const addContact = (email1, email2) => dispatch => {
  axios
    .post('/contact', { email1, email2 })
    .then(res => {
      console.log(res.data);
      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err);
    })
}
  
export const deleteContact = (email1, email2) => dispatch => {
  axios
  .delete('/contact', { email1, email2 })
  .then(res => {
    console.log(res.data);
    dispatch({
      type: DELETE_CONTACT,
      payload: res.data
    })
  })
  .catch(err => {
    console.log(err);
  })
}

export const getContacts = (email) => dispatch => {
  axios
    .get(`/contacts/${email}`)
    .then(res => {
      dispatch({
        type: GET_CONTACTS,
        payload: res.data,
      })
    })
    .catch(err => {
      console.log(err);
    })
}