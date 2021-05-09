import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, ScrollView, Keyboard, Text, ImageBackground, Platform} from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import MainButton from '../components/MainButton';
import LinearGradientIcon from '../components/LinearGradientIcon';
import Colors from '../constants/Colors';

const DogProfileScreen = props => {
    
    const setGender = gender => {
        if(gender == '0')
            return 'זכר';
        else
            return 'נקבה';
    }

    const setSize = size => {
        if(size == '0')
            return 'קטן';
        else if(size == '1')
            return 'בינוני';
        else
            return 'גדול';
    }

    const setIsVaccinated = isVaccinated => {
        if(isVaccinated == true)
            return '√';
        else
            return 'X';
    }

    return (
        <ScrollView style={{flex: 1}}>
        <View style={styles.screen}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.profilePicture}
                    source={{uri: props.dog.imageURL}}
                />
                    <MainButton
                    buttonStyle={styles.addImageIcon}
                    onPress={() => props.navigation.navigate({ 
                        routeName: 'Main'
                    })}
                >
                        <LinearGradientIcon 
                        iconName="arrow-down"
                        iconSize={35}
                        iconColor={Colors.mainColor}
                    />
                </MainButton>
            </View>
            <Text style={styles.name}>{props.dog.name}, {props.dog.age}</Text>
            <View style={styles.propertiesContainer}>
            <View style={styles.keyValuePair}>
                    <Text style={styles.propertiesText}>גזע</Text>
                    <Text style={styles.propertiesText}>{props.dog.race}</Text>
            </View>
            <View style={styles.keyValuePair}>
                    <Text style={styles.propertiesText}>צבע</Text>
                    <Text style={styles.propertiesText}>{props.dog.color}</Text>
            </View>
            <View style={styles.keyValuePair}>
                    <Text style={styles.propertiesText}>מין</Text>
                    <Text style={styles.propertiesText}>{setGender(props.dog.gender)}</Text>
            </View>
            <View style={styles.keyValuePair}>
                    <Text style={styles.propertiesText}>גודל</Text>
                    <Text style={styles.propertiesText}>{setSize(props.dog.size)}</Text>
            </View>
            <View style={styles.keyValuePair}>
                    <Text style={styles.propertiesText}>מחוסן</Text>
                    <Text style={styles.propertiesText}>{setIsVaccinated(props.dog.isVaccinated)}</Text>
            </View>
            <View style={styles.keyValuePair}>
                    <Text style={styles.propertiesText}>מסורס/מעוקרת</Text>
                    <Text style={styles.propertiesText}>{setIsVaccinated(props.dog.isNeutered)}</Text>
            </View>
            <View style={styles.keyValuePair}>
                    <Text style={styles.propertiesText}>מידע כללי</Text>
                    <Text style={styles.propertiesText}>{props.dog.information}</Text>
            </View>
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    profilePicture: {
        height:  Dimensions.get('window').height / 3,
        width: Dimensions.get('window').width,
        alignSelf: 'center',
    },
    name: {
        textAlign: 'center',
        fontSize: 32,
        color: 'black',
        marginVertical: 10,
        marginTop:  Dimensions.get('window').height / 6.5,

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
        //marginTop:  Dimensions.get('window').height / 350,
        height: 60, 
        width: 60,
        borderRadius: 40,
        borderColor: 'black',
        borderWidth: 1,
        //position: 'absolute',
        bottom: Dimensions.get('window').height / 30,
        left: Dimensions.get('window').width / 2,
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

export default DogProfileScreen;