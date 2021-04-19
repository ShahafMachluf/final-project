import React from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native'

const ImageCard = props => {

    const getAdditionalInfo = () => {
        let additionalInfoStr = '';
        if(props.additionalInfo) {
            props.additionalInfo.map((info, index) => {
                if(index > 4){
                    return additionalInfoStr.substring(0, additionalInfoStr.length - 2);
                }

                additionalInfoStr = additionalInfoStr.concat(info, ', ');
            })
        }
        return additionalInfoStr.substring(0, additionalInfoStr.length - 2);
    }

    return (
        <View style={{...styles.container, ...props.style}}>
            <ImageBackground
                style={styles.image} 
                source={{ uri: 'https://image.cnbcfm.com/api/v1/image/105992231-1561667465295gettyimages-521697453.jpeg?v=1561667497&w=630&h=354'}}
            >
                <View style={styles.imageOverlay}>
                    <Text style={styles.info}>{props.name}, {props.age}</Text>
                    <Text style={styles.info}>{getAdditionalInfo()}</Text>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: '10%',
        height: Dimensions.get('window').height / 2,
        // TODO fix card shadow, should work with the styles below
        // android
        elevation: 40,
        // ios
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
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
        marginHorizontal: '3%'
    }
});

export default ImageCard;