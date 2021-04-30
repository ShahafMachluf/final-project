import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import { useSelector } from 'react-redux';
import Slider from '@react-native-community/slider';

import Header from '../components/Header';
import MainButton from '../components/MainButton';
import Separator from '../components/Separator';
import Colors from '../constants/Colors';
import LinearGradientIcon from '../components/LinearGradientIcon';

const ProfileScreen = props => {
    const userDetails = useSelector(state => state.userDetails)
    const [sliderValue, setSliderValue] = useState(5);

    return (
        <View style={styles.screen}>
            <Header 
                hideLogo={true}
                menuClickEventHandler={props.navigation.toggleDrawer} 
            />
            <View style={styles.imageContainer}>
                <Image
                    style={styles.profilePicture}
                    source={require('../assets/no-profile-picture.jpg')}
                />
                <MainButton
                    buttonStyle={styles.addImageIcon}
                    onPress={() => {setSliderValue(15)}}
                >
                    <LinearGradientIcon 
                        iconName="add"
                        iconSize={35}
                        iconColor={Colors.mainColor}
                    />
                </MainButton>
            </View>
            <Text style={styles.name}>{userDetails.name}</Text>
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