import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, ScrollView, StyleSheet, Text, Image, Pressable, RefreshControl} from 'react-native';

import Header from '../components/Header';
import Loader from '../components/Loader';
import {GetMyChats} from '../services/chatService';

const ChatsScreen = props => {
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getChats = async () => {
            setIsLoading(true);
            const chats = await GetMyChats();
            setChats(chats);
            setIsLoading(false);
        }

        getChats();
    }, [setChats])


    const renderItem = ({item}) => {
        return (
            <Pressable onPress={() => {}}>
                <View style={styles.listItem}>
                    <View style={styles.detailsContainer}>
                        <Text>{item.dogOwner.fullName}</Text>
                        <Text>{item.adopter.fullName}</Text>
                    </View>
                </View>
            </Pressable>
        )
    }

    return (
        <View style={{flex: 1}}>
            <FlatList 
                style={styles.screen}
                data={chats}
                renderItem={renderItem}
                ListHeaderComponent={ <Header menuClickEventHandler={props.navigation.toggleDrawer}/>}
                // refreshControl={
                //     <RefreshControl 
                //         refreshing={isRefreshing}
                //         onRefresh={refresh}
                //     />
                // } 
            />
            <Loader active={isLoading}/> 
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
    listItem: {
        display: 'flex',
        flexDirection: 'row-reverse',
        borderWidth: 2,
        borderColor: 'black',
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    detailsContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginRight: 50
    }
})

export default ChatsScreen;