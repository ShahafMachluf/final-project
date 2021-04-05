import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const Header = props => {
    return (
        <View style={{...styles.container, ...props.containerStyle}}>
            <Text style={{...styles.title, ...props.textStyle}}>{props.children}</Text>
            {/* add logo */}
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
    }
});

export default Header;