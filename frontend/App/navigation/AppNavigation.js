import React from 'react';
import { createAppContainer, NavigationActions, StackActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import MainScreen from '../screens/MainScreen';
import CustomHeaderButton from '../components/CustomHeaderButton';

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
        screen: MainScreen,
        navigationOptions: {
            headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title='Menu' iconName='ios-star' onPress={() => {} } />
            </HeaderButtons>
            )
        }
    }
});

const MainNavigation = createDrawerNavigator({
    Main: {
        screen: MainScreen
    }
});

export const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'Main'})]
})

export default createAppContainer(AppNaviation);