import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from "./reducers";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const initialState = {};

const persistConfig = {
  key: 'root',
  storage,
}

const middleware = [thunk];

const persistedReducer = persistReducer(persistConfig, rootReducer, initialState);

const store = createStore(

  persistedReducer,
  compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
);

const persistor = persistStore(store);

export {
  store,
  persistor,
  middleware
};



