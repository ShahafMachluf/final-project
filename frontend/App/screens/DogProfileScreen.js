import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, ScrollView, Text, ActivityIndicator, Platform} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { StackActions } from 'react-navigation';

import MainButton from '../components/MainButton';
import LinearGradientIcon from '../components/LinearGradientIcon';
import Colors from '../constants/Colors';
import Loader from '../components/Loader';

const DogProfileScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const dog = props.navigation.state.params.dog;

    const navigateToMainScreen = () => {
        props.navigation.dispatch(StackActions.popToTop());
        props.navigation.navigate({ 
            routeName: 'Main'
        })
    }

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
            <SafeAreaView>
                <View style={styles.screen}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.profilePicture}
                            source={{uri: dog.imageURL}}
                            onLoadStart={() => {setIsLoading(true)}}
                            onLoad={() => {setIsLoading(false)}} 
                        />
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Loader active={isLoading} />
                        </View>
                        <MainButton
                            buttonStyle={styles.addImageIcon}
                            onPress={navigateToMainScreen}
                        >
                            <LinearGradientIcon 
                                iconName="arrow-down"
                                iconSize={35}
                                iconColor={Colors.mainColor}
                            />
                        </MainButton>
                    </View>
                    <Text style={styles.name}>{dog.name}, {dog.age}</Text>
                    <View style={styles.propertiesContainer}>
                    <View style={styles.keyValuePair}>
                            <Text style={styles.propertiesText}>גזע</Text>
                            <Text style={styles.propertiesText}>{dog.race}</Text>
                    </View>
                    <View style={styles.keyValuePair}>
                            <Text style={styles.propertiesText}>צבע</Text>
                            <Text style={styles.propertiesText}>{dog.color}</Text>
                    </View>
                    <View style={styles.keyValuePair}>
                            <Text style={styles.propertiesText}>מין</Text>
                            <Text style={styles.propertiesText}>{setGender(dog.gender)}</Text>
                    </View>
                    <View style={styles.keyValuePair}>
                            <Text style={styles.propertiesText}>גודל</Text>
                            <Text style={styles.propertiesText}>{setSize(dog.size)}</Text>
                    </View>
                    <View style={styles.keyValuePair}>
                            <Text style={styles.propertiesText}>מחוסן</Text>
                            <Text style={styles.propertiesText}>{setIsVaccinated(dog.isVaccinated)}</Text>
                    </View>
                    <View style={styles.keyValuePair}>
                            <Text style={styles.propertiesText}>מסורס/מעוקרת</Text>
                            <Text style={styles.propertiesText}>{setIsVaccinated(dog.isNeutered)}</Text>
                    </View>
                    <View style={styles.keyValuePair}>
                            <Text style={styles.propertiesText}>מידע כללי</Text>
                            <Text style={styles.propertiesText}>{dog.information}</Text>
                    </View>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: Platform.OS == 'android' ? 25 : 0,
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
    }
});

export default DogProfileScreen;