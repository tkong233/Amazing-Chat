import axios from "axios";
import {
  CONNECT_SOCKET,
  JOIN_ROOM,
  LOAD_PAST_MESSAGES,
  RECEIVE_NEW_MESSAGES,
  SEND_MESSAGE,
  DELETE_MESSAGE,
  SET_ITEM_STATUS,
  DISCONNECT_SOCKET,
  RECEIVE_VIDEO_CALL,
  PICK_UP_VIDEO_CALL,
  HANG_UP_VIDEO_CALL,
  INITIATE_VIDEO_CALL,
  SET_CALLEE_OFFLINE,
  SET_CALLEE_ONLINE,
  STOP_WAITING_FOR_CALLEE_RESPONSE,
} from './types';

export const joinRoom = (
  senderName,
  receiverName,
  sender,
  receiver,
  pairId,
  socket
) => (dispatch) => {
  const data = {
    name: senderName,
    email: sender,
    pairId
  };

  if (socket) {
    socket.emit("join", data);
    dispatch({
      type: JOIN_ROOM,
      payload: { pairId, sender, receiver, senderName, receiverName },
    });
  } else {
    console.log("can not join room because socket is not valid");
  }
};

export const loadPastMessages = (pairId) => (dispatch) => {
  axios
    .get(`/messages/${pairId}`)
    .then((res) => {
      dispatch({
        type: LOAD_PAST_MESSAGES,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const receiveNewMessages = (socket) => (dispatch) => {
  socket.on("receiveMessage", (message) => {
    console.log("receive message", message);
    dispatch({
      type: RECEIVE_NEW_MESSAGES,
      payload: message,
    });
  });
};

export const sendMessage = (data, socket) => (dispatch) => {
  const { pairId, from, to, message, type } = data;
  console.log(message);

  axios
    .post("/message", { pairId, from, to, message, type })
    .then((res) => {
      const { datetime } = res.data.savedMessage;
      socket.emit(
        "sendMessage",
        { pairId, from, to, message, datetime, type },
        message
      );
      dispatch({
        type: SEND_MESSAGE,
        payload: res.data.savedMessage,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteMessage = (data) => dispatch => {
  const { pairId, from, to, message, datetime } = data;
  console.log('chat action: delete message', data);

  axios.delete('/message', { data: { pairId, from, to, message, datetime } })
    .then(res => {
      dispatch({
        type: DELETE_MESSAGE,
        payload: data
      })
    })
  .catch(err => {
    console.log(err);
  })
}

export const setItemStatus = (index, status) => dispatch => {
  dispatch({
    type: SET_ITEM_STATUS,
    payload: { index, status }
  })
}

export const initiateVideoCall = (pairId, from, to, socket) => dispatch => {
  console.log("action: initiate video call");
  socket.emit("initiateVideoCall", { pairId, from, to });
  dispatch({
    type: INITIATE_VIDEO_CALL,
  });
};

export const receiveVideoCall = (socket, email) => dispatch => {
  console.log("action: receive vedio call");
  socket.on("receiveVideoCall", ({ pairId, from, to }) => {
    console.log("socket: receive video call", pairId, 'from', from, 'to', to, 'me', email);
    if (email === to) {
      console.log("I am video call receiver");
      dispatch({
        type: RECEIVE_VIDEO_CALL,
      });
    } else {
      console.log("I am video call sender");
    }
  });
};

export const pickUpVideoCall = (socket, pairId, from, to) => (dispatch) => {
  console.log("action: pick up video call");
  socket.emit("videoCallRequestDecision", { pairId, from, to, accept: true });
  dispatch({
    type: PICK_UP_VIDEO_CALL,
  });
};

export const hangUpVideoCall = (socket, pairId, from, to) => (
  dispatch
) => {
  console.log("action: hang up video call");
  

  socket.emit("videoCallRequestDecision", { pairId, from, to, accept: false });

  dispatch({
    type: HANG_UP_VIDEO_CALL,
  });
};

export const waitForVideoCallDecision = (socket) => dispatch => {
  socket.on('videoCallRequestResult', ({ online, accept }) => {
    if (!online) {
      console.log('socket: callee not online');
      dispatch({
        type: SET_CALLEE_OFFLINE
      })
    } else if (online && accept) {
      console.log('socket: video call request accepted');
      dispatch({
        type: PICK_UP_VIDEO_CALL,
      });
    } else {
      console.log("socket: video call request rejected");
      dispatch({
        type: HANG_UP_VIDEO_CALL,
      });
    }
  })
}

export const stopWaiting = () => dispatch => {
  dispatch({
    type: STOP_WAITING_FOR_CALLEE_RESPONSE
  })
}

export const setCalleeOnline = () => dispatch => {
  console.log('action: set callee online');
  dispatch({
    type: SET_CALLEE_ONLINE
  })
}

export const uploadChatFiles = (formData, socket) => (dispatch) => {
  axios
    .post("/message/uploadfiles", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((res) => {
      const {
        pairId,
        from,
        to,
        message,
        datetime,
        type,
      } = res.data.savedMessage;
      socket.emit(
        "sendMessage",
        { pairId, from, to, message, datetime, type },
        message
      );
      dispatch({
        type: SEND_MESSAGE,
        payload: res.data.savedMessage,
      });
    });
};

export const disconnectSocket = (socket) => (dispatch) => {
  if (socket) {
    console.log('action: disconnect socket');
    socket.disconnect();
  } else {
    console.log("socket is not valid, can not disconnect");
  }

  dispatch({
    type: DISCONNECT_SOCKET,
  });
};
