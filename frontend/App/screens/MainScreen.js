import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import Swiper from 'react-native-deck-swiper'

import ImageCard from '../components/ImageCard'
import MainButton from '../components/MainButton';
import { GetNextDog, LikeDog, getAllDogsHandler } from '../services/dogService';
import Colors from '../constants/Colors';
import LinearGradientIcon from '../components/LinearGradientIcon';
import Header from '../components/Header';

const MainScreen = props => {
    const swiper = useRef(null);
    const [dogs, setDogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => { // get all dogs when the screen is being rendered
        const getDogs = async () => {
            try{
                const receivedDogs = await getAllDogsHandler();
                setDogs(receivedDogs);
            }
            catch (err) {
                console.log(err);
            }
            finally {
                setIsLoading(false);
            }
        }
        
        getDogs();
    }, [setDogs])

    const heartPressEventHandler = () => {
        swiper.current.swipeRight();
    }

    const nextPerssEventHandler = () => {
        swiper.current.swipeLeft();
    }

    const swipeLeftEventHandler = () => {
        console.log("next");
    }

    const swipeRightEventHandler = () => {
        console.log("heart");
    }

    const renderDogCard = dogData => {
        if(dogData) {
            return <ImageCard {...dogData} />
        }
    }

    if(isLoading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator                
                    animating={true} 
                    color="#0000ff" 
                    size='large' 
                />
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Header 
                menuClickEventHandler={props.navigation.toggleDrawer}
            />
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
                onSwipedLeft={swipeLeftEventHandler}
                onSwipedRight={swipeRightEventHandler}
                onSwipedAll={() => {console.log('all swiped')}}
                ref={swiper}
            />

            <View style={styles.buttonsContainer}>
                <MainButton
                    buttonStyle={styles.buttons}
                    onPress={nextPerssEventHandler}
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
    }
});

export default MainScreen;