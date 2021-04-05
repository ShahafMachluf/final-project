import { createAppContainer, NavigationActions, StackActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import MainScreen from '../screens/MainScreen';

const AppNaviation = createStackNavigator({
    Login: { 
        screen: LoginScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Signup: {
        screen: SignupScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Main: {
        screen: MainScreen
    }
});

export const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'Main'})]
})

export default createAppContainer(AppNaviation);