import { CONNECT_SOCKET, JOIN_ROOM, LOAD_PAST_MESSAGES,
   DISCONNECT_SOCKET, SEND_MESSAGE, RECEIVE_NEW_MESSAGES } from '../actions/types';

const initialState = {
  socket: null,
  pairId: null,
  sender: null,
  receiver: null,
  messages: [], // [{ pairId, from, to, message, datetime }]
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CONNECT_SOCKET:
      return {
        ...state,
        socket: action.payload
      };
    case JOIN_ROOM:
      return {
        ...state,
        pairId: action.payload.pairId,
        sender: action.payload.sender,
        receiver: action.payload.receiver,
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
    case DISCONNECT_SOCKET:
      return {
        ...state,
        socket: null,
      }
    default:
      return state;
  }
}