import React from 'react';
import { View, Pressable, Image, Text, StyleSheet } from 'react-native'
import {useSelector} from 'react-redux';


const ChatListItem = props => {
    const numberOfUnreadMessages = useSelector(state => state.chats[props.data.id]?.messages?.length ?? 0);

    const unreadMessagesIndicator = () => {
        if(numberOfUnreadMessages > 0) {
            return (
                <View style={styles.unreadIndicator}>
                    <Text style={styles.numberOfUnreadMessages}>{numberOfUnreadMessages}</Text>
                </View>
            )
        }
    }

    return (
        <Pressable onPress={() => {props.onPress(props.data)}}>
            <View style={styles.listItem}>
                <View style={styles.detailsContainer}>
                    <Image 
                        style={styles.picture}
                        source={props.otherPerson.imageUrl ? {uri: props.otherPerson.imageUrl} : require('../assets/no-profile-picture.jpg')}
                        height={50}
                        width={50}    
                    />
                    <Text style={styles.name}>{props.otherPerson.fullName}</Text>

                    <Image 
                        style={{...styles.picture, ...styles.dogPicture}}
                        source={{uri: props.data.dog.imageURL}}
                        height={50}
                        width={50}    
                    />
                    <Text style={styles.name}>{props.data.dog.name}</Text>
                    
                    {unreadMessagesIndicator()}
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
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
    picture: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 1,
        overflow: 'hidden'
    },
    dogPicture: {
        marginRight: 15
    },
    name: {
        marginRight: 20
    },
    unreadIndicator: {
        backgroundColor: 'red',
        borderRadius: 20,
        height: 20,
        width: 20,
        justifyContent: 'center',
        right: 5,
        position: 'absolute'
    },
    numberOfUnreadMessages: {
        color: 'white',
        alignSelf: 'center',
        justifyContent: 'center'
    }
});

export default ChatListItem;