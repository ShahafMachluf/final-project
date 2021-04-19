import React from 'react';
import {Image, View, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import MainButton from '../components/MainButton';

const Header = props => {
    return (
        <View style={styles.container}>
            <MainButton
                onPress={props.menuClickEventHandler}
            >
                <Ionicons 
                    name="menu"
                    size={30}
                    style={styles.menuIcon}
                />
            </MainButton>
            <Image 
                style={styles.logo}
                source={require('../assets/logo.png')} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: Dimensions.get('window').height / 20
    },
    menuIcon:{
        alignSelf: 'flex-end',
        marginRight: Dimensions.get('window').width / 30
    },
    logo: {
        marginBottom: Dimensions.get('window').height / 15,
        height: Dimensions.get('window').height / 10,
        width: Dimensions.get('window').height / 10,
        alignSelf: 'center'
    }
});

export default Header;