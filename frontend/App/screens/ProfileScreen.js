import React, { useState,useEffect, useRef} from 'react';
import { View, FlatList,Button, Text, StyleSheet, ActivityIndicator, Touchable,Dimensions, TouchableOpacity, Image, Pressable, RefreshControl } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Slider from '@react-native-community/slider';

import Header from '../components/Header';
import Separator from '../components/Separator';
import ProfileImagePicker from '../components/ProfileImagePicker';
import {uploadImageEventHandler, updateMaxDistance} from '../services/userService';
import Loader from '../components/Loader';
import { Item } from 'react-navigation-header-buttons';
import {GetMyDogs} from '../services/dogService';
import {DeleteDog} from '../services/dogService';


const ProfileScreen = props => {
    const userDetails = useSelector(state => state.userDetails)
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [myDogs, setMyDogs] = useState([]);


    const imageTakenHandler = async image => {
        setIsLoadingImage(true);
        await uploadImageEventHandler(image, dispatch);
        setIsLoadingImage(false);
    }

    useEffect(() => {
        const getMyDogs = async () => {
            setIsLoading(true);
            const myDogs = await GetMyDogs();
            setMyDogs(myDogs);
            setIsLoading(false);
        }

        getMyDogs();
    }, [setMyDogs])

    const refresh = async () => {
        setIsRefreshing(true);
        const myDogs = await GetMyDogs();
        setMyDogs(myDogs);
        set
        IsRefreshing(false);
    }

    const onDelete = async dogId => {
        const dog = await DeleteDog(dogId);

    }

    const renderItem = ({item}) => {
        return (
          
            <Pressable onPress={() => {props.navigation.navigate({routeName: 'DogProfile', params: {dog: item}})}}>
                <View style={styles.listItem}>
                    <Image source={{uri: item.imageURL}} style={styles.dogImage} />
                    <View style={styles.detailsContainer}>
                        <Text>{item.name}</Text>
                        <Text>{item.age}</Text>
                        <Text>{item.race}</Text>
                    </View>
                    <Button 
                        onPress={() => {onDelete(item.id)}}
                        title="X"
                        color="gray">
                    </Button>
                </View>
            </Pressable> 
        )
    }

    return (
        <View style={styles.screen}>
            <Header 
               hideLogo={true}
               menuClickEventHandler={props.navigation.toggleDrawer} 
            />
            <ProfileImagePicker 
                onImageTaken={imageTakenHandler}
                renderItem = {({Item,index}) => (
                    <TouchableOpacity onPress = {() => setDialog(index)}> </TouchableOpacity>
                )}
                
            />
            <Loader active={isLoadingImage} />
            <Text style={styles.name}>{userDetails.fullName}</Text>
            <View style={styles.propertiesContainer}>
                <View style={styles.keyValuePair}>
                    <Text style={styles.propertiesText}>דוא"ל</Text>
                    <Text style={styles.propertiesText}>{userDetails.email}</Text>
                </View>
                <Separator />
            </View>

            <View style={{flex: 1}}>
            <View style={styles.keyValuePair}>
                <Text style={styles.propertiesText}>הכלבים שלי</Text>
            </View>
                <FlatList 
                    style={styles.screen}
                    data={myDogs}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl 
                            refreshing={isRefreshing}
                            onRefresh={refresh}
                        />
                    } 
                />
                <Loader active={isLoading}/> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    profilePicture: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        borderRadius: 150,
        borderColor: 'black',
        borderWidth: 1,
        overflow: 'hidden',
        position: 'absolute',
    },
    name: {
        textAlign: 'center',
        fontSize: 32,
        color: 'black',
        marginVertical: 10
    },
    propertiesContainer: {

    },
    propertiesText: {
        marginBottom: 15,
        fontSize: 18,
        color: 'gray'
    },
    keyValuePair: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginVertical: 20,
        marginHorizontal: 30
    },
    addImageIcon: {
        backgroundColor: 'white',
        height: 40, 
        width: 40,
        borderRadius: 40,
        borderColor: 'black',
        borderWidth: 1,
        position: 'absolute',
        bottom: 10,
        left: 10,
        zIndex: 1,
        // android
        elevation: 10,
        // ios
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    imageContainer: {
        width: 158,
        height: 158,
        alignSelf: 'center'
    },
    thumb: {
        marginTop: -20
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
    },
});

export default ProfileScreen;