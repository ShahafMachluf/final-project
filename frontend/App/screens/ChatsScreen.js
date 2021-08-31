import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, ScrollView, StyleSheet, Text, Image, Pressable, RefreshControl} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Header from '../components/Header';
import Loader from '../components/Loader';
import {GetMyChats} from '../services/chatService';
import {InitChat} from '../store/actions/Chats';
import ChatListItem from '../components/ChatListItem';

const ChatsScreen = props => {
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const userDetails = useSelector(state => state.userDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        const getChats = async () => {
            setIsLoading(true);
            await updateChats();
            setIsLoading(false);
        }

        getChats();
    }, [setChats])

    const updateChats = async () => {
        const chats = await GetMyChats();
        setChats(chats);
    }

    const refresh = async () => {
        setIsRefreshing(true);
        await updateChats();
        setIsRefreshing(false);
    }

    const openChat = chatDetails => {
        dispatch(InitChat(chatDetails.id));
        props.navigation.navigate({
            routeName: 'Chat', 
            params: {
                chat: chatDetails
            }
        })
    }

    const getOtherPersonDetails = (chatDetails) => {
        if (userDetails.id === chatDetails.adopter.id) {
            return chatDetails.dogOwner;
        }

        return chatDetails.adopter;
    }

    const renderItem = ({item}) => {
        const otherPerson = getOtherPersonDetails(item);

        return (
            <ChatListItem
                onPress={openChat}
                otherPerson={otherPerson}
                data={item}
            />
        )
    }

    return (
        <View style={{flex: 1}}>
            <FlatList 
                style={styles.screen}
                data={chats}
                renderItem={renderItem}
                ListHeaderComponent={ <Header menuClickEventHandler={props.navigation.toggleDrawer}/>}
                refreshControl={
                    <RefreshControl 
                        refreshing={isRefreshing}
                        onRefresh={refresh}
                    />
                } 
            />
            <Loader style={styles.loader} active={isLoading}/> 
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        marginBottom: 10,
    },
    dogImage: {
        height: 70,
        width: 70,
        borderRadius: 70,
        marginHorizontal: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: 'black'
    },
    loader: {
        position: 'absolute',
        alignSelf: 'center',
        marginVertical: '50%'
    }
})

export default ChatsScreen;