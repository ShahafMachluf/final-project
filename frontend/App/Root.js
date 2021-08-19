import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Notifications from 'expo-notifications';

import { AppNavigation, AuthNavigation } from './navigation/AppNavigation';
import { loadUserDetails } from './store/actions/UserDetails';
import Loader from './components/Loader';
import {InitWebSocket} from './services/chatService';

Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true,
            shouldPlaySound: true
        }
    }
})

const Root = props => {
    const [isLoading, setIsLoading] = useState(true);
    const isLoggedIn = useSelector(state => state.userDetails.token);
    const dispatch = useDispatch();

    useEffect(() => {
        const getUserDetailsFromSQLite =  async () => {
            await dispatch(loadUserDetails());
            setIsLoading(false);
        }
        getUserDetailsFromSQLite();
    }, [dispatch]);

    const getNavigation = () => {
        if (isLoggedIn) {
            InitWebSocket();
            return <AppNavigation />
        }
        return <AuthNavigation />
    }

    if(isLoading) {
        return (
            <View 
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            >
                <Loader active={true}/>
            </View>
        )
    }

    return (
        getNavigation()
    )
}

export default Root;