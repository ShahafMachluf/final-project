import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {View, StyleSheet, Image, Alert, ActivityIndicator} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import MainButton from './MainButton'; 
import Colors from '../constants/Colors';
import LinearGradientIcon from './LinearGradientIcon'

const ProfileImagePicker = props => {
    const userDetails = useSelector(state => state.userDetails);

    const askForCameraPermissions = async () => {
        const result = await ImagePicker.requestCameraPermissionsAsync();
        return result.status === 'granted';
    }

    const askForLibraryPermission = async () => {
        const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
        return result.status === 'granted';
    }
    
    const openCamera = async () => {
        const permission = await ImagePicker.getCameraPermissionsAsync();
        if(!permission.granted) {
            const grantedPermission = await askForCameraPermissions();
            if(!grantedPermission) {
                return;
            }
        }

        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.5,
            base64: true
        });

        if(!image.cancelled) {
            props.onImageTaken(image);
        }
    }

    const openGallery = async () => {
        const permission = await ImagePicker.getMediaLibraryPermissionsAsync();
        if(!permission.granted){
            const grantedPermission = await askForLibraryPermission();
            if(!grantedPermission){
                return;
            }
        }

        const image = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.5,
            base64: true
        });
        
        if(!image.cancelled) {
            props.onImageTaken(image);
        }
    }

    return (
        <View style={styles.imageContainer}>
            <Image
                style={styles.profilePicture}
                width={150}
                height={150}
                source={userDetails.imageUrl ? {uri: userDetails.imageUrl} : require('../assets/no-profile-picture.jpg')}
            />
            <MainButton
                buttonStyle={styles.cameraIcon}
                onPress={openCamera}
            >
                <LinearGradientIcon 
                    iconName="camera-outline"
                    iconSize={28}
                    iconColor={Colors.mainColor}
                />
            </MainButton>
            <MainButton
                buttonStyle={styles.imageIcon}
                onPress={openGallery}
            >
                <LinearGradientIcon 
                    iconName="image-outline"
                    iconSize={28}
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
    cameraIcon: {
        backgroundColor: 'white',
        height: 40, 
        width: 40,
        borderRadius: 40,
        borderColor: 'black',
        borderWidth: 1,
        position: 'absolute',
        bottom: 7,
        left: 7,
        zIndex: 1,
        // android
        elevation: 10,
        // ios
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
    },
    imageIcon: {
        backgroundColor: 'white',
        height: 40, 
        width: 40,
        borderRadius: 40,
        borderColor: 'black',
        borderWidth: 1,
        position: 'absolute',
        bottom: 7,
        right: 7,
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