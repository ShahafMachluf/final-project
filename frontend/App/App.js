import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


import LoginScreen from './screens/LoginScreen'

export default function App() {
  return (
    <LoginScreen />);
{ /*   <View style={styles.container}>
      <Text>Open up App.js to start working on your app!1</Text>
      <StatusBar style="auto" />
  </View>*/}
    
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
