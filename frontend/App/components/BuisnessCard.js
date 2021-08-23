import React from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, Pressable } from 'react-native'


const BuisnessCard = props => {
    return(
        <Pressable 
        disabled={props.disabled} 
        onPress={props.onPress} 
    >
        <View style={{...styles.container}}>
        <ImageBackground
             style={styles.image} 
             source={props.imageUrl ? {uri: Bprops.imageUr} : require('../assets/no-profile-picture.jpg')}
             //source={{uri: 'https://1.bp.blogspot.com/-BnMqqmZAJW0/XUbhir1Bl2I/AAAAAAABrBE/KBv1l7qDt8QuO8C8ymaYuDfcmhux2Ot-ACLcBGAs/s1600/%25D7%2594%25D7%2591%25D7%25A2%25D7%2599%25D7%2594-%25D7%2594%25D7%2599%25D7%25AA%25D7%2594-%25D7%2591%25D7%259E%25D7%2599%25D7%25A0%25D7%2595%25D7%25A0%25D7%2599%25D7%259D.jpg'}}

         >
             <View style={styles.imageOverlay}>
                 <Text style={styles.name}>{props.name}</Text>
                 <Text style={styles.address}>{props.address}, {props.city}</Text>
             </View>
         </ImageBackground>
     </View>
     </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: Dimensions.get('window').height/ 20,
        height: Dimensions.get('window').height / 4,
        width: Dimensions.get('window').width / 1.5,
        marginLeft: Dimensions.get('window').width / 15,
        backgroundColor: 'white',
        borderRadius: 10,
        // android
        elevation: 15,
        // ios
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.51,
        shadowRadius: 8,

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
        backgroundColor: '#03075e',
        height: Dimensions.get('window').height / 15
    },
    name: {
        color: 'white',
        fontSize: 16,
        marginHorizontal: '5%',
        textAlign: 'right',
        marginTop: Dimensions.get('window').height / 80
    },
    address: {
        color: 'white',
        fontSize: 12,
        marginHorizontal: '5%',
        textAlign: 'right'
    }
});

export default BuisnessCard;