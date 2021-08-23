import React, {useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Text, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import SelectMultiple from 'react-native-select-multiple';
import { Ionicons } from '@expo/vector-icons';
import {useSelector} from 'react-redux'


import Header from '../components/Header';
import MainButton from '../components/MainButton';
import Colors from '../constants/Colors';


const CareDogScreen = props => {
    const [choice, setChoice] = useState('');

    const clickChoiceHandler = () => {
            if(choice == 0)
            {
                props.navigation.navigate({
                    routeName: 'Hospitals'
                })
            }
    }

    return (
       <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
        <ScrollView style={{flex: 1}}>
            <Header 
            menuClickEventHandler={props.navigation.toggleDrawer} 
            />
            <Text style={styles.headerText} >מה תרצו לחפש?</Text>
            <View style={styles.screen}>
                <View style={styles.inputContainer}>
                <RNPickerSelect
                            value={choice}
                            placeholder={{
                                label: 'עיין:',
                                value: null,
                                color: '#808080',
                            }}
                            items={[
                                { label: 'וטרינריות', value: 0 },
                                { label: 'חנויות אוכל ורווחה', value: 1 },
                                { label: 'מספרות', value: 2 },
                                { label: 'מאלפי כלבים', value: 3 },
                                { label: 'פנסיונים', value: 4 },
                            ]}
                            onValueChange = {setChoice}
                            style={{...pickerSelectStyles, iconContainer: styles.iconContainer}}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => <Ionicons name="md-arrow-down" size={24} color="gray" />}
                        />

                        <MainButton 
                            onPress={clickChoiceHandler} 
                            buttonStyle={styles.continueButton}
                            linearGradientColor={Colors.mainColor} 
                        >
                            <Text style={styles.continueText}>חפש</Text>
                        </MainButton>
                    </View>
                </View>
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
        marginBottom: Dimensions.get('window').height / 60
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      textAlign: 'center',
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 4,
      color: 'black',
      marginHorizontal: Dimensions.get('window').width / 10,
      marginTop: Dimensions.get('window').width / 15,
    },
    inputAndroid: {
      textAlign: 'center',
      fontSize: 16,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 8,
      color: 'black',
      marginHorizontal: Dimensions.get('window').width / 10,
      marginTop: Dimensions.get('window').width / 15,
    },
  });
  

export default CareDogScreen;