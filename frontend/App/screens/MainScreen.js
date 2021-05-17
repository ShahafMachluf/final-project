import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native'
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
    const [noDogs, setNoDogs] = useState(false);
    
    useEffect(() => { // get all dogs when the screen is being rendered
        const getDogs = async () => {
            try{
                const receivedDogs = await getAllDogsHandler();
                setDogs(receivedDogs);
                if(receivedDogs.length === 0) {
                    setNoDogs(true);
                }
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
            { !noDogs && <Swiper
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
                onSwipedAll={() => {setNoDogs(true);}}
                ref={swiper}
            />}
            { noDogs && <View style={styles.noDogs}>
                <Text>לא מצאנו כלבים נוספים</Text>
                <Text>הגדל את המרחק המירבי או נסה שוב מאוחר יותר</Text>
            </View>}
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