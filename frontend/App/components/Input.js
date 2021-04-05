import React, { forwardRef } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = forwardRef((props, ref) => {
    return (
        <TextInput {...props} ref={ref} style={{...styles.input, ...props.style}} />
    )
})

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 10
    }
});

export default Input;