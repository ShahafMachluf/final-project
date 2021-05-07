import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import Swiper from 'react-native-deck-swiper'

import ImageCard from '../components/ImageCard'
import MainButton from '../components/MainButton';
import { GetNextDog, LikeDog, getAllDogsHandler } from '../services/dogService';
import Colors from '../constants/Colors';
import LinearGradientIcon from '../components/LinearGradientIcon';
import Header from '../components/Header';

const MainScreen = props => {
    const swiper = useRef(null);
    const [dogs, setDogs] = useState([
        // {name: '1גקי', age: 9, additionalInfo: ['קטן','פינצר','מחונך','שקט','נקי','אוהב ילדים'], key: 1, image: 'https://image.cnbcfm.com/api/v1/image/105992231-1561667465295gettyimages-521697453.jpeg?v=1561667497&w=630&h=354'},
        // {name: '2גקי', age: 9, additionalInfo: ['קטן','פינצר','מחונך','שקט','נקי','אוהב ילדים'], key: 2, image: 'https://medias.timeout.co.il/www/uploads/2018/07/%D7%9B%D7%9C%D7%91-%D7%9E%D7%AA%D7%95%D7%A7-T-1140x641.jpg'},
        // {name: '3גקי', age: 9, additionalInfo: ['קטן','פינצר','מחונך','שקט','נקי','אוהב ילדים'], key: 3, image: 'https://shahaf.family/wp-content/uploads/2019/03/dog-4372036_1920.jpg'},
        // {name: '4גקי', age: 9, additionalInfo: ['קטן','פינצר','מחונך','שקט','נקי','אוהב ילדים'], key: 4, image: 'https://image.cnbcfm.com/api/v1/image/105992231-1561667465295gettyimages-521697453.jpeg?v=1561667497&w=630&h=354'}
    ]);
    
    useEffect(() => {
        const getDogs = async () => {
            try{
                const receivedDogs = await getAllDogsHandler();
                setDogs(receivedDogs);
            }
            catch (err) {
                console.log(err);
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
        console.log(swiper);
        console.log("heart");
    }

    const renderDogCard = dogData => {
        if(dogData) {
            return <ImageCard {...dogData} />
        }
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
        marginTop: 30,
    },
    cardContainer: {
        position: 'relative',
        height: '55%',
        width: '100%'
    }
});

export default MainScreen;