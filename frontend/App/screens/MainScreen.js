import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const MainScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>In main screen!!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});

export default MainScreen;