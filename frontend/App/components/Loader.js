import React from 'react';
import {ActivityIndicator} from 'react-native';

const Loader = props => {
    return (
        <ActivityIndicator 
            animating={props.active} 
            color="#0000ff" 
            size='large'
        />
    )
}

export default Loader;