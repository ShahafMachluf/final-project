import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const MainButton = props => {
    return (
        <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
            <View style={{...styles.button, ...props.buttonStyle}}>
                <Text style={{...styles.buttonText, ...props.textStyle}}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        paddingVertical: 7,
        paddingHorizontal: 30,
        borderRadius: 17
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center'
    }
});

export default MainButton;