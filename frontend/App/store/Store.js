import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import userDetailsReducer from './reducers/UserDetails'

const rootReducer = combineReducers({
    userDetails: userDetailsReducer
  });
  
const store = createStore(
  rootReducer, 
  composeWithDevTools(
    applyMiddleware(thunk)  
  )
  );

export default store;