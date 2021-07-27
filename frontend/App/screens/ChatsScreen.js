import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, ScrollView, StyleSheet, Text, Image, Pressable, RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';

import Header from '../components/Header';
import Loader from '../components/Loader';
import {GetMyChats} from '../services/chatService';

const ChatsScreen = props => {
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const userDetails = useSelector(state => state.userDetails);

    useEffect(() => {
        const getChats = async () => {
            setIsLoading(true);
            const chats = await GetMyChats();
            setChats(chats);
            setIsLoading(false);
        }

        getChats();
    }, [setChats])

    const getOtherPersonDetails = (chatDetails) => {
        if (userDetails.id === chatDetails.adopter.id) {
            return chatDetails.dogOwner;
        }

        return chatDetails.adopter;
    }

    const renderItem = ({item}) => {
        const otherPerson = getOtherPersonDetails(item);

        return (
            <Pressable onPress={() => {props.navigation.navigate({routeName: 'Chat', params: {chat: item}})}}>
                <View style={styles.listItem}>
                    <View style={styles.detailsContainer}>
                        <Image 
                            style={styles.profilePicture}
                            source={otherPerson.imageUrl ? {uri: otherPerson.imageUrl} : require('../assets/no-profile-picture.jpg')}
                            height={50}
                            width={50}    
                        />
                        <Text style={styles.name}>{otherPerson.fullName}</Text>
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
        flexDirection: 'row-reverse',
        flex: 1,
        marginLeft: 10,
        marginVertical: 10,
        alignItems: 'center'
    },
    profilePicture: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 1,
        overflow: 'hidden'
    },
    name: {
        marginRight: 20
    }
})

export default ChatsScreen;