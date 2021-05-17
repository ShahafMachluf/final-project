import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import MainButton from './MainButton'; 

const ImgPicker = forwardRef((props, ref) => {
    const [pickedImage, setPickedImage] = useState(null);

    useImperativeHandle(ref, () => ({
        clear() {
            setPickedImage(null);
        }
    }))

    const askForLibraryPermission = async () => {
        const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
        return result.status === 'granted';
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
        if(!image.cancelled){
            setPickedImage(image);
            props.onImageTaken(image);
        }
    }
    

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imageContainer}>
                {!pickedImage ? 
                    <Text>לא נבחרה תמונה</Text> :
                    <Image 
                        style={styles.imagePreview}
                        width={100}
                        height={100} 
                        source={{uri: pickedImage.uri}} 
                    />
                }
            </View>
            <MainButton
                onPress={openGallery}
                buttonStyle={styles.selectImageButton}
            >
                <Text>בחר תמונה</Text>
            </MainButton>
        </View>
    )
})

const styles = StyleSheet.create({
    imagePicker: {
        flexDirection: 'row',
        flex: 1,
        justifyContent:'space-between',
        alignItems: 'center',
        width: '100%'
    },
    imagePreview: {
        width: 100,
        height: 100,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1
    },
    imageContainer: {
        marginVertical: 20
    },
    selectImageButton: {
        backgroundColor: 'gray',
        height: 35,
        paddingHorizontal: 10
    }
})

export default ImgPicker;