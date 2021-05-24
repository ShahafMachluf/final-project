import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import userDetailsReducer from './reducers/UserDetails'
import webSocketReducer from './reducers/WebSocket';
import chatReducer from './reducers/Chats';

const rootReducer = combineReducers({
    userDetails: userDetailsReducer,
    webSocket: webSocketReducer,
    chats: chatReducer
  });
  
const store = createStore(
  rootReducer, 
  composeWithDevTools(
    applyMiddleware(thunk)  
  )
  );

export default store;