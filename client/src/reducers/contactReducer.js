import { GET_CONTACTS, GET_SUGGESTION, ADD_CONTACT, DELETE_CONTACT, GET_ALL_USERS } from "../actions/types";

const initialState = {
  contacts: [],
  suggestion: [],
  users: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload
      };
    case GET_SUGGESTION:
      return {
        ...state,
        suggestion: action.payload
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: action.payload
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: action.payload
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
}