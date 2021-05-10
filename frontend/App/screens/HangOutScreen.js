import React from 'react';
import {StyleSheet, View, Text} from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'

import Header from '../components/Header';
import MapCard from '../components/MapCard';

const HnagOutScreen = props => {
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

    return (
        <View style={styles.screen}>
            <MapView style={styles.map} region={mapRegion}>
                <Marker coordinate={example}>
                    <Callout tooltip={true} >
                        <MapCard />
                    </Callout>
                </Marker>
            </MapView>
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
    }
})

export default HnagOutScreen;