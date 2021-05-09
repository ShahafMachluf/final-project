import React from 'react';
import { Dimensions,Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import MainScreen from '../screens/MainScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DogProfileScreen from '../screens/DogProfileScreen';
import CreateDogScreen from '../screens/CreateDogScreen';
import Drawer from '../components/Drawer';
import HangOutScreen from '../screens/HangOutScreen';

const app = createDrawerNavigator({
    Main: {
        screen: MainScreen,
        navigationOptions: {
            drawerLabel: 'אימוץ כלב',
            drawerIcon: () => (
                <Image 
                    source={require('../assets/dog.png')}
                    style={{height: 24, width: 24}}
                />
            )
        }
    },
    AddNewDog: {
        screen: CreateDogScreen,
        navigationOptions: {
            drawerLabel: 'מציאת מאמץ',
            drawerIcon: () => (
                <Ionicons name='home' size={24}/>
            )
        }
    },
    LikedDogs: {
        screen: DogProfileScreen,
        navigationOptions: {
            drawerLabel: 'כלבים שאהבתי',
            drawerIcon: () => (
                <Ionicons name='heart' size={24}/>
            )
        }
    },
    Chats: {
        screen: MainScreen,
        navigationOptions: {
            drawerLabel: `צ'אטים `,
            drawerIcon: () => (
                <Ionicons name='chatbubble-ellipses' size={24}/>
            )
        }
    },
    TakeCare: {
        screen: MainScreen,
        navigationOptions: {
            drawerLabel: 'דואגים לכלב',
            drawerIcon: () => (
                <Image 
                    source={require('../assets/bigPlus.png')}
                    style={{height: 24, width: 24}}
                />
            )
        }
    },
    HangOut: {
        screen: HangOutScreen,
        navigationOptions: {
            drawerLabel: 'מבלים עם הכלב',
            drawerIcon: () => (
                <Image 
                    source={require('../assets/parasol.png')}
                    style={{height: 24, width: 24}}
                />
            )
        }
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            drawerLabel: 'פרופיל',
            drawerIcon: () => (
                <Ionicons name='person' size={24}/>
            ),
        
        }
    }
},
{
    drawerPosition: 'right',
    drawerType: 'slide',
    contentComponent: Drawer,
    drawerWidth: Dimensions.get('window').width / 2,
    initialRouteName: 'Main',
    backBehavior: 'history'
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