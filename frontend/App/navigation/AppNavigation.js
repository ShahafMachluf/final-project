import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import MainScreen from '../screens/MainScreen';
import Drawer from '../components/Drawer';

const app = createDrawerNavigator({
    Main: {
        screen: MainScreen,
        navigationOptions: {
            headerShown: true,
            drawerLabel: 'MAIN',
        }
    }
},
{
    drawerPosition: 'right',
    drawerType: 'slide',
    //contentComponent: Drawer
});

const auth = createStackNavigator({
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
    }
});

export const AppNavigation = createAppContainer(app);

export const AuthNavigation = createAppContainer(auth);