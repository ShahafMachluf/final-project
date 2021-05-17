import React, {useState} from 'react';
import {View, FlatList, StyleSheet, Text, Image, Pressable} from 'react-native';

import Header from '../components/Header'

const LikedDogsScreen = props => {
    // TODO get liked dogs from server
    //      add option to remove a dog from this list (by long press or something like this)
    //      edit renderItem() to show name, age, race (and more?)
    const [likedDogs, setLikedDogs] = useState([
        {
            id: 1,
            name: `ג'קי`,
            imageURL: 'https://res.cloudinary.com/dogapp444/image/upload/v1621253804/yq682rq87fqpiwhlvnyv.jpg'
        },
        {
            id: 2,
            name: `ג'קי`,
            imageURL: 'https://res.cloudinary.com/dogapp444/image/upload/v1621253804/yq682rq87fqpiwhlvnyv.jpg'
        },
        {
            id: 3,
            name: `ג'קי`,
            imageURL: 'https://res.cloudinary.com/dogapp444/image/upload/v1621253804/yq682rq87fqpiwhlvnyv.jpg'
        },
        {
            id: 4,
            name: `ג'קי`,
            imageURL: 'https://res.cloudinary.com/dogapp444/image/upload/v1621253804/yq682rq87fqpiwhlvnyv.jpg'
        },
        {
            id: 5,
            name: `ג'קי`,
            imageURL: 'https://res.cloudinary.com/dogapp444/image/upload/v1621253804/yq682rq87fqpiwhlvnyv.jpg'
        },
        {
            id: 6,
            name: `ג'קי`,
            imageURL: 'https://res.cloudinary.com/dogapp444/image/upload/v1621253804/yq682rq87fqpiwhlvnyv.jpg'
        },
        {
            id: 7,
            name: `ג'קי`,
            imageURL: 'https://res.cloudinary.com/dogapp444/image/upload/v1621253804/yq682rq87fqpiwhlvnyv.jpg'
        },
        {
            id: 8,
            name: `ג'קי`,
            imageURL: 'https://res.cloudinary.com/dogapp444/image/upload/v1621253804/yq682rq87fqpiwhlvnyv.jpg'
        },
        {
            id: 9,
            name: `ג'קי`,
            imageURL: 'https://res.cloudinary.com/dogapp444/image/upload/v1621253804/yq682rq87fqpiwhlvnyv.jpg'
        },
        {
            id: 10,
            name: `ג'קי`,
            imageURL: 'https://res.cloudinary.com/dogapp444/image/upload/v1621253804/yq682rq87fqpiwhlvnyv.jpg'
        }
    ]);

    const renderItem = ({item}) => {
        return (
            <Pressable onPress={() => {props.navigation.navigate({routeName: 'DogProfile', params: {dog: item}})}}>
                <View style={styles.listItem}>
                    <Image source={{uri: item.imageURL}} style={styles.dogImage} />
                    <View style={styles.detailsContainer}>
                        <Text>{item.name}</Text>
                        <Text>{item.name}1</Text>
                        <Text>{item.name}2</Text>
                    </View>
                </View>
            </Pressable>
        )
    }

    return (
        <View style={styles.screen}>
            <Header 
                menuClickEventHandler={props.navigation.toggleDrawer}
            />
            <FlatList 
                style={styles.list}
                data={likedDogs}
                renderItem={renderItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1
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
    list: {
        marginHorizontal: 20,
        marginBottom: 10
    },
    listItem: {
        display: 'flex',
        flexDirection: 'row-reverse',
        borderWidth: 2,
        borderColor: 'black',
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center'
    },
    detailsContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginRight: 50
    }
})

export default LikedDogsScreen;