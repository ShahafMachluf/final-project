import React, {useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Text, ActivityIndicator, FlatList } from 'react-native';
import { StackActions } from 'react-navigation';

import Header from '../components/Header';
import BuisnessCard from '../components/BuisnessCard'
import Loader from '../components/Loader';
import { getAttractionByType } from '../services/attractionsService';

const BuisnessScreen = props => {
        const typeAttraction = props.navigation.state.params.type;
        const [buisness, setBuisness] = useState([]);
        const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getBuisness = async () => {
            setIsLoading(true);
            const buisness = await getAttractionByType(typeAttraction);
            setBuisness(buisness);
            setIsLoading(false);
        }

        getBuisness();
    }, [])

    const navigateBack = () => {
        props.navigation.dispatch(StackActions.popToTop());

    }
    const setHeader = () => {
        if(typeAttraction == 1)
            return 'וטרינריות';
        else if(typeAttraction == 2)
            return 'חנויות אוכל ורווחה';
        else if(typeAttraction == 3)
            return 'מספרות';
        else if(typeAttraction == 4)
            return 'מאלפי כלבים';
        else if(typeAttraction == 5)
            return 'פנסיונים';

    }
    const navigateBuisness = (item) => {
        props.navigation.navigate({ 
            routeName: 'BuisnessProfile',
            params: {buisness: item}
        })

    }

    const renderItem = ({item}) => {
        return (
            <View style={styles.screen}>
                <BuisnessCard 
                    name={item.name} 
                    address={item.address} 
                    city={item.city} 
                    imageUrl={item.imageURL} 
                    onPress={() => {navigateBuisness(item)}}
                />
            </View>
        )
    }
    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
            <ScrollView style={{flex: 1}}>
                <Header 
                    hideMenuIcon = {true}
                    showBackLabel = {true}
                    navigateBack = {navigateBack}
                />
                <Text style={styles.headerText} >{setHeader()}</Text>
                <Loader active={isLoading}/>
                <FlatList
                    //style={styles.inputContainer}
                    contentContainerStyle = {styles.inputContainer}
                    data={buisness}
                    renderItem={renderItem}
                />
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: Dimensions.get('window').width / 10,
    },
    headerText: {
        fontSize: 25,
        color: '#808080', 
        textAlign: "center",
    },
    inputContainer: {
        flex: 1,
        width: '100%',
        //marginBottom: Dimensions.get('window').height / 60,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'center', 
        //alignItems: 'center', 
        //justifyContent: 'space-between',

    },
    iconContainer: {
        marginTop: Dimensions.get('window').width / 10.5,
        right: Dimensions.get('window').width / 8,
    },
    continueButton: {
        borderColor: 'black',
        marginHorizontal: Dimensions.get('window').width / 8,
        height: Dimensions.get('window').height / 18,
        width: '70%',
        marginTop: 30,
    },
    continueText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    }
});

export default BuisnessScreen;