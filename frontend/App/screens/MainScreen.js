import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { Ionicons } from '@expo/vector-icons';

import ImageCard from '../components/ImageCard'
import MainButton from '../components/MainButton';
import { ReactToDog, getAllDogsHandler } from '../services/dogService';
import Colors from '../constants/Colors';
import LinearGradientIcon from '../components/LinearGradientIcon';
import Header from '../components/Header';
import Loader from '../components/Loader';

const MainScreen = props => {
    const swiperRef = useRef(null);
    const [dogs, setDogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [noDogs, setNoDogs] = useState(false);
    
    const getDogs = async () => {
        try{
            setIsLoading(true);
            const receivedDogs = await getAllDogsHandler();
            setDogs(receivedDogs);
            if(receivedDogs.length === 0) {
                setNoDogs(true);
            } else {
                setNoDogs(false);
            }
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
    }, [setDogs])

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

    const emptyMessage = () => {
        return (
            <View style={styles.noDogs}>
                <Text>לא מצאנו כלבים נוספים</Text>
                <Text>הגדל את המרחק המירבי או נסה שוב מאוחר יותר</Text>
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
            return <ImageCard {...dogData} />
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
            <Header 
                menuClickEventHandler={props.navigation.toggleDrawer}
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
    }
});

export default MainScreen;