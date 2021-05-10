import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Svg, Image as ImageSvg} from 'react-native-svg';

const MapCard = props => {
    // TODO get location details from props

    const props1 = {
        name: 'חוף הכלבים',
        address: 'טיילת שלמה להט, תל אביב יפו',
        imageUrl: 'http://cdn.shopify.com/s/files/1/1497/0598/files/470193e66b5b27bf818d98bd6fe7e32b_large.jpg'
    }

    if(true) {
        return (
            <View style={styles.screen}>
            <Svg style={styles.imageContainer}>
                <ImageSvg 
                    width={'100%'}
                    height={'100%'}
                    style={styles.image}
                    preserveAspectRatio='xMidYMid slice'
                    href={{ uri: props1.imageUrl}}
                />
            </Svg>
             
                <Text style={styles.title}>{props1.name}</Text>
                <Text>{props1.address}</Text>
                <Text>{props1.address}</Text>
        </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Svg style={styles.imageContainer}>
                <ImageSvg 
                    width={'100%'}
                    height={'100%'}
                    style={styles.image}
                    preserveAspectRatio='xMidYMid slice'
                    href={{ uri: props1.imageUrl}}
                />
            </Svg>
            <View style={styles.detailsContainer}>                    
                <Text style={styles.title}>{props1.name}</Text>
                <Text>{props1.address}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: 400,
        width: 300,
        backgroundColor: 'red',
        borderRadius: 10,
        alignItems: 'center',
        overflow: 'hidden',
    },
    detailsContainer: {
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    image: {
        borderRadius: 100
    },
    imageContainer: {
        height: 100,
        width: 200,
        
    }
});

export default MapCard;