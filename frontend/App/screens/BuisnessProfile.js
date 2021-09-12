import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, ScrollView, Text, ActivityIndicator, Platform} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import MainButton from '../components/MainButton';
import LinearGradientIcon from '../components/LinearGradientIcon';
import Colors from '../constants/Colors';
import Loader from '../components/Loader';
import { StackActions } from 'react-navigation';


const Buisnessprofile = props => {

    const buisness = props.navigation.state.params.buisness;

    const [isLoading, setIsLoading] = useState(false);

    const navigateBack = () => {
        const popAction = StackActions.pop({n: 1,});
        props.navigation.dispatch(popAction);

    }

    return (
        <ScrollView style={{flex: 1}}>
            <SafeAreaView>
                <View style={styles.screen}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.profilePicture}
                            source={buisness.imageURL ? {uri: buisness.imageURL} : require('../assets/no-profile-picture.jpg')}
                            onLoadStart={() => {setIsLoading(true)}}
                            onLoad={() => {setIsLoading(false)}} 
                        />
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Loader active={isLoading} />
                        </View>
                        <MainButton
                            buttonStyle={styles.addImageIcon}
                            onPress={navigateBack}
                        >
                            <LinearGradientIcon 
                                iconName="arrow-down"
                                iconSize={35}
                                iconColor={Colors.mainColor}
                            />
                        </MainButton>
            </View>
            <Text style={styles.name}>{buisness.name}</Text>
            <Text style={styles.address}>{buisness.address}, {buisness.city}</Text>
            <Text style={styles.address}>{buisness.phone}</Text>
            <Text style={styles.info}>{buisness.info}</Text>
        </View>
        </SafeAreaView>
        </ScrollView>
                      
    )}

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
            marginTop:  Dimensions.get('window').height / 6.5,
    
        },
        address: {
            textAlign: 'center',
            fontSize: 16,
            color: 'black',
    
        },
        info: {
            padding: 2,
            textAlign: 'right',
            fontSize: 18,
            color: 'black',
            marginTop:  Dimensions.get('window').height / 20,
            marginRight: Dimensions.get('window').width / 30,
    
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
export default Buisnessprofile;