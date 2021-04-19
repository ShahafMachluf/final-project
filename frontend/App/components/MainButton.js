import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MainButton = props => {

    if(props.linearGradientColor) {
        return (
            <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
                <LinearGradient 
                    style={{...styles.button, ...props.buttonStyle}}
                    colors={props.linearGradientColor}
                >
                    {props.children}
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
            <View style={{...styles.button, ...props.buttonStyle}}>
                {props.children}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 17
    }
});

export default MainButton;