import React from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';

import store from './store/Store';
import Root from './Root';
import MainScreen from './screens/MainScreen';

enableScreens();

export default function App() {

  return (
    <Provider store={store}>
      <Root />
    </Provider>
    );
}
