import React from 'react';
import { Dimensions,Image } from 'react-native';
import { createAppContainer, ThemeColors } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import MainScreen from '../screens/MainScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DogProfileScreen from '../screens/DogProfileScreen';
import CreateDogScreen from '../screens/CreateDogScreen';
import CareDogScreen from '../screens/CareDogScreen';
import BuisnessProfile from '../screens/BuisnessProfile';
import Drawer from '../components/Drawer';
import HangOutScreen from '../screens/HangOutScreen';
import MapCard from '../components/MapCard'
import LikedDogsScreen from '../screens/LikedDogsScreen';
import ChatsScreen from '../screens/ChatsScreen';
import ChatScreen from '../screens/ChatScreen';
import store from '../store/Store';
import { ResetPassword } from '../services/dataServices/userDataService';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import LogoutScreen from '../screens/LogoutScreen';
import BuisnessScreen from '../screens/BuisnessScreen';

let hasNewMessages = false;
store.subscribe(() => {
    const chats = Object.values(store.getState().chats);
    hasNewMessages = chats.some(c => c.messages?.length > 0)
})

const createDog = createStackNavigator({
    Form: {
        screen: CreateDogScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    DogProfile: {
        screen: DogProfileScreen,
        navigationOptions: {
            headerShown: false
        }
    }
})

const careDog = createStackNavigator({
    Search: {
        screen: CareDogScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Buisness: {
        screen: BuisnessScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Buisness: {
        screen: BuisnessProfile,
        navigationOptions: {
            headerShown: false
        }
    }
})

const likedDogs = createStackNavigator({
    LikedDogs: {
        screen: LikedDogsScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    DogProfile: {
        screen: DogProfileScreen,
        navigationOptions: {
            headerShown: false
        }
    }
}, {detachInactiveScreens: true})

const userProfile = createStackNavigator({
    UserProfile: {
        screen: ProfileScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    DogProfile: {
        screen: DogProfileScreen,
        navigationOptions: {
            headerShown: false
        }
    }
}, {detachInactiveScreens: true})

const main = createStackNavigator({
    MainScreen: {
        screen: MainScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    DogProfile: {
        screen: DogProfileScreen,
        navigationOptions: {
            headerShown: false
        }
    }
}, {detachInactiveScreens: true})


const chat = createStackNavigator({
    Chats: {
        screen: ChatsScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Chat: {
        screen: ChatScreen,
        navigationOptions: {
            headerShown: false
        }
    }
})

const app = createDrawerNavigator({
    Main: {
        screen: main,
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
        screen: createDog,
        navigationOptions: {
            drawerLabel: 'מציאת מאמץ',
            drawerIcon: () => (
                <Ionicons name='home' size={24}/>
            )
        }
    },
    LikedDogs: {
        screen: likedDogs,
        navigationOptions: {
            drawerLabel: 'כלבים שאהבתי',
            drawerIcon: () => (
                <Ionicons name='heart' size={24}/>
            )
        }
    },
    Chats: {
        screen: chat,
        navigationOptions: {
            drawerLabel: `צ'אטים `,
            drawerIcon: () => (
                <Ionicons name='chatbubble-ellipses' size={24} color={hasNewMessages ? "red" : "black"}/>
            )
        }
    },
    TakeCare: {
        screen: careDog,
        //screen: BuisnessProfile,
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
        screen: userProfile,
        navigationOptions: {
            drawerLabel: 'פרופיל',
            drawerIcon: () => (
                <Ionicons name='person' size={24}/>
            )
        },
    },
    Logout: {
        screen: LogoutScreen,
        navigationOptions: {
            drawerLabel: 'התנתק',
            drawerIcon: () => (
                <Ionicons name="log-out" size={24}/>
            )
        }
    }
},
{
    drawerPosition: 'right',
    drawerType: 'slide',
    contentComponent: Drawer,
    drawerWidth: Dimensions.get('window').width / 2,
    initialRouteName: 'Main',
    backBehavior: 'history',
    unmountInactiveRoutes: true
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
    },
    ForgotPassword: {
        screen: ForgotPasswordScreen,
        navigationOptions: {
            headerShown: false
        }
    }
});

const chatNotification = createStackNavigator({
    Main: {
        screen: MainScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Chat: {
        screen: ChatScreen,
        navigationOptions: {
            headerShown: false
        }
    }
})


export const AppNavigation = createAppContainer(app);

export const AuthNavigation = createAppContainer(auth);