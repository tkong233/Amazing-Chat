import axios from "axios";
import { CONNECT_SOCKET, JOIN_ROOM, LOAD_PAST_MESSAGES,
  RECEIVE_NEW_MESSAGES, SEND_MESSAGE, DISCONNECT_SOCKET } from './types';

export const connectSocket = (socket) => dispatch => {
  dispatch({
    type: CONNECT_SOCKET,
    payload: socket
  })
}

export const joinRoom = (name, pairId, sender, receiver, socket) => dispatch => {
  const data = {
    name,
    pairId
  };

  if (socket) {
    socket.emit('join', data);
    dispatch({
      type: JOIN_ROOM,
      payload: { pairId, sender, receiver }
    })
  } else {
    console.log('can not join room because socket is not valid');
  }
}

export const loadPastMessages = (pairId) => dispatch => {
  axios.get(`/messages/${pairId}`)
    .then(res => {
      dispatch({
        type: LOAD_PAST_MESSAGES,
        payload: res.data,
      })
    })
    .catch(err => {
      console.log(err)
    });
}

export const receiveNewMessages = (socket) => dispatch => {
  socket.on('receiveMessage', (message) => {
    // TODO: only add message to state if it's not sent by myself
    // (if sent by myself, should already been added in sendMessage)
    console.log('receive message', message);
    dispatch({
      type: RECEIVE_NEW_MESSAGES,
      payload: message,
    })
  })
}

export const sendMessage = (data, socket) => dispatch => {
  const { pairId, from, to, message } = data;

  axios.post('/message', { pairId, from, to, message })
    .then(res => {
      const { datetime } = res.data.savedMessage;
      socket.emit('sendMessage', { pairId, from, to, message, datetime }, message);
      dispatch({
        type: SEND_MESSAGE,
        payload: res.data.savedMessage,
      })
    })
    .catch(err => {
      console.log(err);
    })
}

export const disconnectSocket = (socket) => dispatch => {
  if (socket) {
    socket.disconnect();
  } else {
    console.log('socket is not valid, can not disconnect');
  }

  dispatch ({
    type: DISCONNECT_SOCKET,
  })
}