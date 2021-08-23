import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native'
import { WebView } from 'react-native-webview';
import MapView, { Marker, Callout } from 'react-native-maps'

import Header from '../components/Header';
import MapCard from '../components/MapCard';
import {getAttractions} from '../services/attractionsService';
import Loader from '../components/Loader';

const HnagOutScreen = props => {
    const [attractions, setAttractions] = useState([]);

    const mapRegion = { // location of tel aviv
        latitude: 32.079157,
        longitude: 34.774181,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    const example = {
        latitude: 32.09198,
        longitude: 34.77071,
    }

    useEffect(() => {
        const fetchAttractions = async () => {
            const result = await getAttractions();
            setAttractions(result);
        }

        fetchAttractions();
    }, [setAttractions])

    const setMarker = attraction => {
        return (
            <Marker 
                key={attraction.id} 
                coordinate={{latitude: attraction.latitude, longitude: attraction.longitude}}
            >
                <Callout tooltip>
                    <MapCard data={attraction}/>
                </Callout>
            </Marker>
        )
    }

    if(attractions.length === 0) {
        return (
            <View style={styles.loader}>
                <Loader active={true} />
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <WebView
            source={{html: '<iframe width="90%" height="100%" src="https://www.google.com/maps/d/u/0/embed?mid=1i7meoBPH0SHWOK5ap5Arna0-KNf3XfwO" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'}}
            style={
                {
                    marginTop: 30
                    
                
                }}
            />
            <Header // not working if Header is above the map 
                hideLogo={true}
                style={styles.menuButton}
                menuClickEventHandler={props.navigation.toggleDrawer} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    menuButton:{
        position: 'absolute',
        alignSelf: 'flex-end'
    },
    map: {
        flex:1,
        zIndex: -1
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default HnagOutScreen;