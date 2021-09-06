import React from 'react';
import {StyleSheet, View} from 'react-native'
import { WebView } from 'react-native-webview';

import Header from '../components/Header';

const HnagOutScreen = props => {
    return (
        <View style={styles.screen}>
            <WebView
            source={{html: '<iframe width="90%" height="100%" src="https://www.google.com/maps/d/u/0/embed?mid=1i7meoBPH0SHWOK5ap5Arna0-KNf3XfwO" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'}}
            style={styles.map}
                
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
        marginTop: 30
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default HnagOutScreen;