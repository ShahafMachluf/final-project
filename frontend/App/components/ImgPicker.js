import React, { useState } from 'react';
import {View, StyleSheet, Image, Text, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import MainButton from './MainButton'; 

const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState();

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
            quality: 0.5
        });
    
        setPickedImage(image.uri);
    }

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!pickedImage ? 
                    <Text>לא נבחרה תמונה</Text> :
                    <Image style={styles.image} source={{uri: pickedImage}} />
                }
            </View>
            <MainButton
                onPress={takeImageHandler}
            >
                <Text>בחר</Text>
            </MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center'
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    }
})

export default ImgPicker;