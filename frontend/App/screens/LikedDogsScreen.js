import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, ScrollView, StyleSheet,Button, Text, Image, Pressable, RefreshControl} from 'react-native';

import Header from '../components/Header'
import {GetLikedDogs} from '../services/dogService';
import Loader from '../components/Loader';
import {DeleteLikedDog} from '../services/dogService';

const LikedDogsScreen = props => {
    // TODO 
    //      add option to remove a dog from this list (by long press or something like this)
    //      edit renderItem() to show name, age, race (and more?)
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [likedDogs, setLikedDogs] = useState([]);
    const [dogDeleted, setDogDeleted] = useState(false);


    useEffect(() => {
        const getLikedDogs = async () => {
            setIsLoading(true);
            const likedDogs = await GetLikedDogs();
            setLikedDogs(likedDogs);
            setIsLoading(false);
            setDogDeleted(false);
        }

        getLikedDogs();
    }, [setLikedDogs,dogDeleted])

    const refresh = async () => {
        setIsRefreshing(true);
        const likedDogs = await GetLikedDogs();
        setLikedDogs(likedDogs);
        setIsRefreshing(false);
    }
    

    const onDelete = async dogId => {
        await DeleteLikedDog(dogId);
        setDogDeleted(true);
        setLikedDogs(dogs => dogs.filter(d => d.id !== dogId))
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
        <View style={{flex: 1}}>
            <FlatList 
                style={styles.screen}
                data={likedDogs}
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
    loader: {
        position: 'absolute',
        alignSelf: 'center',
        marginVertical: '50%'
    }
})

export default LikedDogsScreen;