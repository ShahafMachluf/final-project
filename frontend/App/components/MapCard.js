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
                <Text>{props1.address}</Text>
                <Text>{props1.address}</Text>
                <Text>{props1.address}</Text>
                <Text>{props1.address}</Text>
                <Text>{props1.address}</Text>
                <Text>{props1.address}</Text>
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
        marginHorizontal: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    image: {

        height: 100,
        width: 200
    },
    imageContainer: {
        height: 100,
        width: 200,
        
    }
});

export default MapCard;