import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Slider from '@react-native-community/slider';

import Header from '../components/Header';
import Separator from '../components/Separator';
import ProfileImagePicker from '../components/ProfileImagePicker';
import {uploadImageEventHandler, updateMaxDistance} from '../services/userService';

const ProfileScreen = props => {
    const userDetails = useSelector(state => state.userDetails)
    const [sliderValue, setSliderValue] = useState(userDetails.maxDistance);
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const dispatch = useDispatch();

    const setMaxDistance = async () => {
        if(userDetails.maxDistance !== sliderValue) {
            await updateMaxDistance(sliderValue, dispatch);
        }
    }

    const imageTakenHandler = async image => {
        setIsLoadingImage(true);
        await uploadImageEventHandler(image, dispatch);
        setIsLoadingImage(false);
    }

    return (
        <View style={styles.screen}>
            <Header 
                hideLogo={true}
                menuClickEventHandler={props.navigation.toggleDrawer} 
            />
            <ProfileImagePicker 
                onImageTaken={imageTakenHandler}
            />
            <ActivityIndicator 
                animating={isLoadingImage} 
                color="#0000ff" 
                size='large'
            />
            <Text style={styles.name}>{userDetails.fullName}</Text>
            <View style={styles.propertiesContainer}>
                <View style={styles.keyValuePair}>
                    <Text style={styles.propertiesText}>דוא"ל</Text>
                    <Text style={styles.propertiesText}>{userDetails.email}</Text>
                </View>
                <Separator />
                <View style={styles.keyValuePair}>
                    <Text style={styles.propertiesText}>מרחק מירבי</Text>
                    <Text style={styles.propertiesText}>{sliderValue} ק"מ</Text>
                </View>
                <Slider
                    minimumValue={5}
                    maximumValue={100}
                    minimumTrackTintColor="#000000"
                    maximumTrackTintColor="#000000"
                    onValueChange={setSliderValue}
                    onSlidingComplete={setMaxDistance}
                    step={1}
                    thumbTintColor='gray'
                    value={sliderValue}
                    style={styles.thumb}
                    
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
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
    name: {
        textAlign: 'center',
        fontSize: 32,
        color: 'black',
        marginVertical: 10
    },
    propertiesContainer: {

    },
    propertiesText: {
        marginBottom: 15,
        fontSize: 18,
        color: 'gray'
    },
    keyValuePair: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginVertical: 20,
        marginHorizontal: 30
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
    },
    thumb: {
        marginTop: -20
    }
});

export default ProfileScreen;