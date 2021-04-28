import React from 'react';
import { useSelector } from 'react-redux';
import { AppNavigation, AuthNavigation } from './navigation/AppNavigation';

const Root = props => {
    const isLoggedIn = useSelector(state => state.auth.token);

    const getNavigation = () => (
        isLoggedIn ? <AppNavigation /> : <AuthNavigation />
    )

    return (
        getNavigation()
    )
}

export default Root;