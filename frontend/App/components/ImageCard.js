import React from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native'

const ImageCard = props => {

    const getAdditionalInfo = (dogInfo) => {
        let additionalInfoStr = dogInfo.race + ', ' + dogInfo.color + ', ';

        if(dogInfo.isVaccinated) {
            if(dogInfo.gender === 0) {
               additionalInfoStr = additionalInfoStr.concat('מחוסן, ') 
            }
            else {
                additionalInfoStr = additionalInfoStr.concat('מחוסנת, ') 
            }
        }
        if(dogInfo.IsNeutered) {
            if(dogInfo.gender === 0) {
                additionalInfoStr = additionalInfoStr.concat('מסורס, ') 
            }
            else {
                additionalInfoStr = additionalInfoStr.concat('מעוקרת, ') 
            }
        }

        return additionalInfoStr.substring(0, additionalInfoStr.length - 2);
    }

    return (
        <View style={{...styles.container}}>
           <ImageBackground
                style={styles.image} 
                source={{ uri: props.imageURL}}
            >
                <View style={styles.imageOverlay}>
                    <Text style={styles.info}>{props.name}, {props.age}</Text>
                    <Text style={styles.info}>{getAdditionalInfo(props)}</Text>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: '10%',
        height: Dimensions.get('window').height / 2,
        backgroundColor: 'white',
        borderRadius: 10,
        // android
        elevation: 15,
        // ios
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
    },
    image: {
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 10,
      overflow: 'hidden',
    },
    imageOverlay: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: Dimensions.get('window').height / 10
    },
    info: {
        color: 'white',
        fontSize: 20,
        marginHorizontal: '3%',
        textAlign: 'right'
    }
});

export default ImageCard;