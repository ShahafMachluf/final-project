import React from 'react';
import { View, StyleSheet } from 'react-native';

const Separator = props => {
    return (
        <View style={{...styles.separator, ...props.style}}>
        </View>
    )
}

const styles = StyleSheet.create({
    separator: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '100%',
    }
})

export default Separator;