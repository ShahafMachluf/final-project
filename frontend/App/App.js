import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import AppNavigation from './navigation/AppNavigation';
import authReducer from './store/reducers/auth'

enableScreens();

const rootReducer = combineReducers({
  auth: authReducer
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
    );
}
