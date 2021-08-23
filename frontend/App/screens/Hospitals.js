import React, {useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Text, ActivityIndicator, FlatList } from 'react-native';

import Header from '../components/Header';
import BuisnessCard from '../components/BuisnessCard'
import { StackActions } from 'react-navigation';



const Hospitals = props => {
        const [hospitals, setHospitals] = useState([{
             name: 'גורג',
             address: 'פלורנטין 21',
             city: 'Tel-Aviv',
             info: 'blablablab'
        },
    {
        name: 'Gorge',
        address: 'Florentin 21',
        city: 'Tel-Aviv',
        info: 'blablablab'
    },
    {
        name: 'Gorge',
        address: 'Florentin 21',
        city: 'Tel-Aviv',
        info: 'blablablab'
    },]);

    useEffect(() => {
        const getHospitals = async () => {
            setIsLoading(true);
            const hospitals = await getAttractionByType(0);
            setHospitals(hospitals);
            setIsLoading(false);
        }

        getHospitals();
    }, [setHospitals])

    const navigateBack = () => {
        props.navigation.dispatch(StackActions.popToTop());

    }
    const navigateBuisness = (item) => {
        props.navigation.navigate({ 
            routeName: 'Buisness',
            params: {buisness: item}
        })

    }

    const renderItem = ({item}) => {
        return (

                <View style={styles.screen}>
                        <BuisnessCard name = {item.name} address = {item.address} city = {item.city} imageUrl = {item.image} onPress={() => {navigateBuisness(item)}}></BuisnessCard>
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
            <Text style={styles.headerText} >וטרינריות</Text>
            <FlatList
            //style={styles.inputContainer}
            contentContainerStyle = {styles.inputContainer}
            data={hospitals}
            renderItem={renderItem}/>
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

export default Hospitals;