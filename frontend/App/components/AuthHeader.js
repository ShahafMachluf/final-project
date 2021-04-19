import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const AuthHeader = props => {
    return (
        <View style={{...styles.container, ...props.containerStyle}}>
            <Text style={{...styles.title, ...props.textStyle}}>{props.children}</Text>
            <Image 
                style={styles.logo}
                source={require('../assets/logo.png')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height / 5,
        marginTop: 30,
        width: '100%',
        alignItems: 'center'
    },
    title: {
        color: 'gray'
    },
    logo: {
        marginVertical: 15,
        height: Dimensions.get('window').height / 10,
        width: Dimensions.get('window').height / 10
    }
});

export default AuthHeader;