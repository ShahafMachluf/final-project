import React from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';

import AppNavigation from './navigation/AppNavigation';
import store from './store/Store';

enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
    );
}
