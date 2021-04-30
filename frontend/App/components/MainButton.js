import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MainButton = props => {
    if(props.linearGradientColor) {
        return (
            <Pressable 
                disabled={props.disabled} 
                onPress={props.onPress} 
            >
                <LinearGradient 
                    colors={props.linearGradientColor}
                    style={{...styles.button, ...props.buttonStyle}}
                >
                    {props.children}
                </LinearGradient>
            </Pressable>
        )
    }

    return (
        <Pressable 
            disabled={props.disabled} 
            onPress={props.onPress} 
            style={{...styles.button, ...props.buttonStyle}}
        >
                {props.children}
        </Pressable>
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