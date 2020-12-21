import { combineReducers } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import contactReducer from './contactReducer';
import chatReducer from './chatReducer';

// const chatPersistConfig = {
//   key: 'chat',
//   storage,
//   blacklist: ['chat']
// }

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  contact: contactReducer,
  chat: chatReducer,
});
