import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MapCard = props => {
    // TODO get location details from props

    return (
        <View style={styles.screen}>
            <Text>שם המקום</Text>
            <Text>תיאור</Text>
            <Text>תיאור</Text>
            <Text>תיאור</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white',
        overflow: 'hidden',
        borderRadius: 10,
        // android
        elevation: 20,
        // ios
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2
    }
});

export default MapCard;