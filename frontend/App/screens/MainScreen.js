import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator, Text, Pressable, Dimensions, Button} from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import RNPickerSelect from 'react-native-picker-select';

import ImageCard from '../components/ImageCard'
import MainButton from '../components/MainButton';
import { ReactToDog, getAllDogsHandler, getDogsByAreaHandler } from '../services/dogService';
import Colors from '../constants/Colors';
import LinearGradientIcon from '../components/LinearGradientIcon';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { updatePushNotificationToken } from '../services/userService';
import { getAllDogs } from '../services/dataServices/dogDataService';

const MainScreen = props => {
    const swiperRef = useRef(null);
    const [dogs, setDogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [noDogs, setNoDogs] = useState(false);
    const [area, setArea] = useState('');
    
    const getDogs = async () => {
        try{
            setIsLoading(true);
            if(area.length !== 0)
                getDogsByArea(area);
            else
                getAllDogs();
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => { // get all dogs when the screen is being rendered
        getDogs();
        // get notification permissions
        Notifications.getPermissionsAsync().then(status => {
            if (!status.granted) {
                return Notifications.requestPermissionsAsync().then(status => {
                    if(status.granted) {
                        setNotificationsHandlers();
                    } else {
                        throw new Error('Permission not granted');
                    }
                })
            } else {
                setNotificationsHandlers();
            }
        }).then(() => {
            return Notifications.getExpoPushTokenAsync();
        }).then(response => {
            const token = response.data;
            console.log("token: " + token);
            updatePushNotificationToken(token);
        }).catch(err => {
            console.log(err);
            return null;
        })
    }, [setDogs,area])
    
    const setNotificationsHandlers = () => {
        const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response)
            props.navigation.navigate({
                routeName: 'Chat', 
                params: {
                    chat: response.notification.request.content.data.chatDetails
                }
            })
        })
    }

    const navigateToChat = chatId => {
        dispatch(InitChat(chatDetails.id));
        props.navigation.navigate({
            routeName: 'Chat', 
            params: {
                chat: chatDetails
            }
        })
    }

    const heartPressEventHandler = () => {
        swiperRef.current.swipeRight();
    }

    const nextPerssEventHandler = () => {
        swiperRef.current.swipeLeft();
    }

    const swipeEventHandler = (index, reaction) => {
        const swipedDog = dogs[index];
        ReactToDog(swipedDog.id, reaction);
    }

    const getDogsByArea = async () => {
        const receivedDogs = await getDogsByAreaHandler(area);
        setDogs(receivedDogs);
            if(receivedDogs.length === 0) {
                setNoDogs(true);
            } else {
                setNoDogs(false);
            }
    }

    const getAllDogs = async () => {
        const receivedDogs = await getAllDogsHandler();
        setDogs(receivedDogs);
            if(receivedDogs.length === 0) {
                setNoDogs(true);
            } else {
                setNoDogs(false);
            }   
    }

    const emptyMessage = () => {
        return (
            <View style={styles.noDogs}>
                <Text>לא מצאנו כלבים נוספים</Text>
                <Text>החלף אזור או נסה שוב מאוחר יותר</Text>
                <MainButton 
                    onPress={getDogs}
                >
                    <Ionicons name='refresh' size={30} />
                </MainButton>
            </View>
        )
    }

    const swiper = () => {
        return (   
            <Swiper
                cardStyle={{paddingTop: 20}}
                containerStyle={styles.cardContainer}
                backgroundColor={'white'}
                cardVerticalMargin={0}
                disableBottomSwipe={true}
                disableTopSwipe={true}
                verticalSwipe={false}
                cards={dogs}
                stackSize={2}
                showSecondCard={true}
                renderCard={renderDogCard}
                onSwipedLeft={(index) => {swipeEventHandler(index, 2)}}
                onSwipedRight={(index) => {swipeEventHandler(index, 1)}}
                onSwipedAll={() => {setNoDogs(true);}}
                ref={swiperRef} 
            />
        )
    }

    const renderDogCard = dogData => {
        if(dogData) {
            return <Pressable onPress={() => {props.navigation.navigate({routeName: 'DogProfile', params: {dog: dogData}})}}>
               <ImageCard {...dogData} />
            </Pressable>
        }
    }

    if(isLoading) {
        return (
            <View style={styles.loader}>
                <Loader active={true} />
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Header style={styles.Header}
                menuClickEventHandler={props.navigation.toggleDrawer}
                
            />
            <RNPickerSelect
                value={area}
                placeholder={{
                    label: 'בחר אזור בארץ',
                    value: null,
                    color: '#808080',
                }}
                items={[
                    { label: 'צפון', value: 0 },
                    { label: 'מרכז', value: 1 },
                    { label: 'השרון', value: 2 },
                    { label: 'ירושלים', value: 3 },
                    { label: 'דרום', value: 4 },
                    ]}
                onValueChange={setArea}
                style={{...pickerSelectStyles, iconContainer: styles.iconContainer}}
                useNativeAndroidPickerStyle={false}
                Icon={()=> <Ionicons name="md-arrow-down" size={21} color="gray" />}
            /> 
      
            { !noDogs && swiper()}
            { noDogs && emptyMessage()}
            <View style={styles.buttonsContainer}>
                <MainButton
                    buttonStyle={styles.buttons}
                    onPress={nextPerssEventHandler}
                    disabled={noDogs}
                >
                    <LinearGradientIcon 
                        iconName="arrow-back"
                        iconSize={60}
                        iconColor={Colors.backArrow}
                    />
                </MainButton>
                <MainButton 
                    buttonStyle={styles.buttons}
                    onPress={heartPressEventHandler}
                    disabled={noDogs}
                >
                    <LinearGradientIcon 
                        iconName="heart"
                        iconSize={60}
                        iconColor={Colors.mainColor}
                    />
                </MainButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons: {
        backgroundColor: 'gray',
        width: 80,
        height: 80,
        borderRadius: 80
    },
    refreshButton: {
        
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: '50%',
        marginTop: 30
    },
    cardContainer: {
        position: 'relative',
        height: '55%',
        width: '100%'
    },
    noDogs: {
        height: '55%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        flex: 1,
        width: '100%',
        marginBottom: Dimensions.get('window').height / 60
    },
    iconContainer: {
        marginTop: Dimensions.get('window').width / 10.5,
        right: Dimensions.get('window').width / 3.3,
    },
    Header: {
        height: '11.5%',
    }

});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      textAlign: 'center',
      fontSize: 16,
      paddingVertical: 7,
      paddingHorizontal: 7,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 4,
      color: 'black',
      marginHorizontal: Dimensions.get('window').width / 3.5,
      marginTop: Dimensions.get('window').width / 13,
      marginBottom: 10,
    },
    inputAndroid: {
      textAlign: 'center',
      fontSize: 16,
      paddingHorizontal: 7,
      paddingVertical: 7,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 8,
      color: 'black',
      marginHorizontal: Dimensions.get('window').width / 3.5,
      marginTop: Dimensions.get('window').width / 15,
    },
  });

export default MainScreen;