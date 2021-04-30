import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { AppNavigation, AuthNavigation } from './navigation/AppNavigation';
import { loadUserDetails } from './store/actions/UserDetails';

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

    const getNavigation = () => (
        isLoggedIn ? <AppNavigation /> : <AuthNavigation />
    )

    if(isLoading) {
        // TODO change this to loader
        return (
            <View 
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            >
                <ActivityIndicator 
                    animating={true} 
                    color="#0000ff" 
                    size='large'
                />
            </View>
        )
    }

    return (
        getNavigation()
    )
}

export default Root;