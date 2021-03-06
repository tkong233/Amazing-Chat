import { SET_SOCKET, UNSET_SOCKET, CONNECT_SOCKET, JOIN_ROOM, LOAD_PAST_MESSAGES,
   DISCONNECT_SOCKET, SEND_MESSAGE, DELETE_MESSAGE, RECEIVE_NEW_MESSAGES,
   RECEIVE_VIDEO_CALL, PICK_UP_VIDEO_CALL, HANG_UP_VIDEO_CALL,
   INITIATE_VIDEO_CALL, SET_CALLEE_ONLINE, SET_CALLEE_OFFLINE,
   STOP_WAITING_FOR_CALLEE_RESPONSE, SET_ITEM_STATUS, VIDEO_CALL_REJECTED, RESET_VIDEO_CALL_REJECTED, 
   CALLER_HANGED_CALL, DELETE_CONVERSATION
  } from '../actions/types';

const initialState = {
  socket: null,
  pairId: null,
  sender: null, //email
  receiver: null, // email
  senderName: null,
  receiverName: null,
  messages: [], // [{ pairId, from, to, message, datetime, type }]
  itemStatusMap: {}, // {index: status}, e.g. { 1 : LOADING, 2 : LOADED... }
  ringing: false,
  calling: false,
  waiting: false,
  rejected: false,
  calleeOnline: true,
}

export default function(state = initialState, action) {
  // console.log(state, action);
  switch (action.type) {

    case SET_SOCKET:
      console.log('set socket on login', action.payload);
      return {
        ...state,
        socket: action.payload
      }
    case UNSET_SOCKET:
      console.log('unset socket in state');
      return {
        ...state,
        socket: null
      }
    case CONNECT_SOCKET:
      return {
        ...state,
        // socket: action.payload
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
      // console.log(newMessages);
      return {
        ...state,
        messages: newMessages,
      };
    case SET_ITEM_STATUS:
      const { index, status } = action.payload;
      state.itemStatusMap[index] = status;
      return {
        ...state,
      }
    case SEND_MESSAGE:
      newMessages = state.messages;
      newMessages.push(action.payload);
      return {
        ...state,
        messages: newMessages,
      };
    case RECEIVE_NEW_MESSAGES:
      if (action.payload.from !== state.sender) {
        newMessages = state.messages;
        newMessages.push(action.payload);
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
    case DELETE_MESSAGE:
      const { message, datetime} = action.payload;
      newMessages = state.messages.filter(m => {
        return ((m.message != message) || (m.datetime != datetime))
      })
      return {
        ...state,
        messages: newMessages
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
    case SET_CALLEE_ONLINE:
      return {
        ...state,
        calleeOnline: true,
      }
    case SET_CALLEE_OFFLINE:
      return {
        ...state,
        calleeOnline: false,
      }
    case STOP_WAITING_FOR_CALLEE_RESPONSE:
      return {
        ...state,
        waiting: false,
        ringing: false,
        calling: false,
        calleeOnline: true
      }
    case VIDEO_CALL_REJECTED:
      return {
        ...state,
        rejected: true,
      }
    case RESET_VIDEO_CALL_REJECTED:
      return {
        ...state,
        rejected: false,
      }
    case CALLER_HANGED_CALL:
      return {
        ...state, 
        rejected: false,
        waiting: false,
        ringing: false,
        calling: false,
        calleeOnline: true,
      }
    case DELETE_CONVERSATION:
      return {
        ...state,
        messages: []
      }
    default:
      return state;
  }
}