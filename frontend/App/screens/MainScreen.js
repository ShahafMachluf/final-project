import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ImageCard from '../components/ImageCard'
import MainButton from '../components/MainButton';
import { GetNextDog, LikeDog } from '../services/dogService';
import CustomHeaderButton from '../components/CustomHeaderButton';

const MainScreen = props => {

    const heartPressEventHandler = () => {
        LikeDog();
        GetNextDog();
    }

    return (
        <View style={styles.screen}>
            {/* add here App icon and remove top margin from ImageCard */}
            <ImageCard
                style={{marginTop: 150}}
                name={'גקי'} 
                age={9}
                additionalInfo={['קטן','פינצר','מחונך','שקט','נקי','אוהב ילדים']}
            />
            <View style={styles.buttonsContainer}>
                <MainButton
                    buttonStyle={styles.buttons}
                    isIcon={true}
                    iconName='arrow-back'
                    iconSize={60}
                    iconColor="black" // TODO change the color
                    onPress={GetNextDog}
                >
                </MainButton>
                <MainButton
                    buttonStyle={styles.buttons}
                    isIcon={true}
                    iconName='heart'
                    iconSize={60}
                    iconColor="black" // TODO change the color
                    onPress={heartPressEventHandler}
                >
                </MainButton>
            </View>
        </View>
    )
}

MainScreen.navigationOptions = navData => {
    return {
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title='Menu' iconName='menu' onPress={() => {
                    console.log(navData.navigation)
                    //navData.navigation.toggleDrawer();
                } } />
            </HeaderButtons>
            )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
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