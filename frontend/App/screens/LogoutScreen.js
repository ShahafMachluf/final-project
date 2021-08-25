import React, {useEffect} from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../store/actions/UserDetails';
import { RemoveWebSocket } from '../store/actions/WebSocket';
import { RemoveChats } from '../store/actions/Chats';

const LogoutScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
        dispatch(RemoveWebSocket());
        dispatch(RemoveChats());
    }, [])

    return (
        <View></View>
    )
}

export default LogoutScreen;