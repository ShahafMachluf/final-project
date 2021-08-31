import React from 'react';
import {ActivityIndicator} from 'react-native';

const Loader = props => {
    return (
        <ActivityIndicator 
            style={{...props.style}}
            animating={props.active} 
            color="#0000ff" 
            size='large'
        />
    )
}

export default Loader;