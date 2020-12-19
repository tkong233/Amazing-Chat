import { CONNECT_SOCKET, JOIN_ROOM, LOAD_PAST_MESSAGES,
   DISCONNECT_SOCKET, SEND_MESSAGE, RECEIVE_NEW_MESSAGES,
   RECEIVE_VIDEO_CALL, PICK_UP_VIDEO_CALL, HANG_UP_VIDEO_CALL,
   INITIATE_VIDEO_CALL,
  } from '../actions/types';

const initialState = {
  socket: null,
  pairId: null,
  sender: null, //email
  receiver: null, // email
  senderName: null,
  receiverName: null,
  messages: [], // [{ pairId, from, to, message, datetime, type }]
  ringing: false,
  calling: false,
  waiting: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CONNECT_SOCKET:
      return {
        ...state,
        socket: action.payload
      };
    case JOIN_ROOM:
      let { pairId, sender, receiver, senderName, receiverName } = action.payload;
      return {
        ...state,
        pairId,
        sender,
        receiver,
        senderName,
        receiverName,
      };
    case LOAD_PAST_MESSAGES:
      let newMessages = state.messages;
      newMessages = action.payload;
      return {
        ...state,
        messages: newMessages,
      };
    case SEND_MESSAGE:
      newMessages = state.messages;
      newMessages.push(action.payload);
      console.log('send message', newMessages);
      return {
        ...state,
        messages: newMessages,
      };
    case RECEIVE_NEW_MESSAGES:
      console.log('receive new message reducer,', action.payload);
      if (action.payload.from !== state.sender) {
        newMessages = state.messages;
        newMessages.push(action.payload);
        console.log('added new message', newMessages);
        return {
          ...state,
          messages: newMessages,
        }
      } else {
        console.log('message was sent by myself!', state.messages);
        return {
          ...state,
        }
      }
    case INITIATE_VIDEO_CALL:
      return {
        ...state,
        waiting: true,
      }
    case RECEIVE_VIDEO_CALL:
      return {
        ...state,
        ringing: true
      }
    case PICK_UP_VIDEO_CALL:
      return {
        ...state,
        ringing: false,
        waiting: false,
        calling: true
      }
    case HANG_UP_VIDEO_CALL:
      return {
        ...state,
        ringing: false,
        waiting: false,
        calling: false,
      }
    case DISCONNECT_SOCKET:
      return {
        ...state,
        socket: null,
      }
    default:
      return state;
  }
}