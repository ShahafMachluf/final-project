import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {View, StyleSheet, Image, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import MainButton from './MainButton'; 
import Colors from '../constants/Colors';
import LinearGradientIcon from './LinearGradientIcon'

const ProfileImagePicker = props => {
    const [pickedImage, setPickedImage] = useState();
    const userDetails = useSelector(state => state.userDetails);

    useEffect(() => {
        console.log(`in useEffect updating image url to ${userDetails.imageUrl}`)
        if(userDetails.imageUrl) {
            setPickedImage(userDetails.imageUrl);
        }
    }, [userDetails])

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.MEDIA_LIBRARY);
        if(result.status !== 'granted') {
            Alert.alert('תן גישה יזין', 'יזין',[{text: 'טוב נו'}]);
            return false;
        }
    
        return true;
    }
    
    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions()
        if(!hasPermission) {
            return;
        }
        
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.5,
            base64: true

        });

        setPickedImage(image.uri);
        props.onImageTaken(image);
    }

    return (
        <View style={styles.imageContainer}>
            <Image
                style={styles.profilePicture}
                width={150}
                height={150}
                source={ props.image ? props.image : ( pickedImage ? {uri: pickedImage} : require('../assets/no-profile-picture.jpg') )}
            />
            <MainButton
                buttonStyle={styles.addImageIcon}
                onPress={takeImageHandler}
            >
                <LinearGradientIcon 
                    iconName="add"
                    iconSize={35}
                    iconColor={Colors.mainColor}
                />
            </MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    profilePicture: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        borderRadius: 150,
        borderColor: 'black',
        borderWidth: 1,
        overflow: 'hidden',
        position: 'absolute',
    },
    addImageIcon: {
        backgroundColor: 'white',
        height: 40, 
        width: 40,
        borderRadius: 40,
        borderColor: 'black',
        borderWidth: 1,
        position: 'absolute',
        bottom: 10,
        left: 10,
        zIndex: 1,
        // android
        elevation: 10,
        // ios
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    imageContainer: {
        width: 158,
        height: 158,
        alignSelf: 'center'
    }
})

export default ProfileImagePicker;