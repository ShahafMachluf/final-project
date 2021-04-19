import React from 'react'
import { View, StyleSheet } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures';

import ImageCard from '../components/ImageCard'
import MainButton from '../components/MainButton';
import { GetNextDog, LikeDog } from '../services/dogService';
import Colors from '../constants/Colors';
import LinearGradientIcon from '../components/LinearGradientIcon';
import Header from '../components/Header';

const MainScreen = props => {

    const heartPressEventHandler = () => {
        LikeDog();
        GetNextDog();
    }

    const nextPerssEventHandler = () => {

    }

    return (
        <View style={styles.screen}>
            <Header 
                menuClickEventHandler={props.navigation.toggleDrawer}
            />
            <GestureRecognizer
                onSwipeLeft={() => {console.log("LEFT!")}} // TODO move the image and execute the relevant function
                onSwipeRight={() => {console.log("RIGHT!")}}
            >
                <ImageCard // TODO remove static data and get real data from server
                    name={'גקי'} 
                    age={9}
                    additionalInfo={['קטן','פינצר','מחונך','שקט','נקי','אוהב ילדים']}
                />
            </GestureRecognizer>
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
        marginTop: 30
    }
});

export default MainScreen;