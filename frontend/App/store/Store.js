import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userDetailsReducer from './reducers/UserDetails'

const rootReducer = combineReducers({
    userDetails: userDetailsReducer
  });
  
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;