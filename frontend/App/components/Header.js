import React from 'react';
import {Image, View, StyleSheet, Dimensions, Text } from 'react-native';
import { StackActions } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

import MainButton from '../components/MainButton';

const Header = props => {

    return (
        <View style={{...styles.container, ...props.style}}>
            <MainButton
                buttonStyle={styles.button}
                onPress={props.menuClickEventHandler}
            >
            {!props.hideMenuIcon && <Ionicons 
                    name="menu"
                    size={30}
                    style={styles.menuIcon}
                />}
            {props.showBackLabel && <MainButton 
                            onPress={props.navigateBack} 
                            buttonStyle={styles.continueButton}
                            linearGradientColor={Colors.mainColor} 
                        >
                            <Text style={styles.continueText}>חזור</Text>
                        </MainButton>}
            </MainButton>
            {!props.hideLogo && <Image 
                style={styles.logo}
                source={require('../assets/logo.png')}
            />}
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
        marginBottom: Dimensions.get('window').height / 20,
        height: Dimensions.get('window').height / 10,
        width: Dimensions.get('window').height / 10,
        alignSelf: 'center'
    },
    button: {
        alignSelf: 'flex-end',
    },
    continueButton: {
        borderColor: 'black',
        marginHorizontal: Dimensions.get('window').width / 28,
        height: Dimensions.get('window').height / 26,
        width: Dimensions.get('window').width / 6,

    },
    continueText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    }
});

export default Header;