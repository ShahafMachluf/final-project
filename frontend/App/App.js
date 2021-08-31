import React from 'react';
import { I18nManager } from 'react-native'
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';

import store from './store/Store';
import Root from './Root';
import { init, removeUserTable } from './store/db';
import ProfileScreen from './screens/ProfileScreen';
import MainScreen from './screens/MainScreen'

init().then(() => {
 console.log('init sucess');
    //removeUserTable().then((res) => {
      //console.log(res);
   //}) 
}).catch((error) => {
  console.log('init error ', error);
})
I18nManager.allowRTL(false);
enableScreens();

export default function App() {

  return (
    //<CreateDogScreen></CreateDogScreen>
      <Provider store={store}>
        <Root />
      </Provider>
    );
}
