import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Svg, Image as ImageSvg} from 'react-native-svg';
import { WebView } from 'react-native-webview';

const MapCard = props => {
    const getImage = (imageURL) => (
        `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
        <html xmlns="http://www.w3.org/1999/xhtml">
           <head>
              <style> * { margin:0; padding:0; } </style>
           </head>
           <body>
              <div>
                 <img src="${imageURL}" alt="image" width="1000" height="400" /> 
              </div>
           </body>
        </html>`
    )


    return (
        <View style={styles.screen}>
            <WebView 
                style={styles.image}
                source={{html: getImage(props.data.imageURL)}}
            />
            <View style={styles.detailsContainer}>                    
                <Text style={styles.title}>{props.data.name}</Text>
                <Text>{props.data.address}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: 50
    },
    detailsContainer: {
        flex: 1,
        //marginHorizontal: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    image: {
        height: 100,
        width: 200,
    }
});

export default MapCard;