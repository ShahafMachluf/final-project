import React, {useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Text, ActivityIndicator } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import SelectMultiple from 'react-native-select-multiple';
import { Ionicons } from '@expo/vector-icons';
import {useSelector} from 'react-redux'

import Header from '../components/Header';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import {createDogHandler} from '../services/dogService';
import Dog from '../models/Dog'
import Colors from '../constants/Colors'
import ImgPicker from '../components/ImgPicker';
import DogProfileScreen from './DogProfileScreen';
import { SafeAreaView } from 'react-navigation';

const CreateDogScreen = props => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [race, setRace] = useState('');
    const [color, setColor] = useState('');
    const [gender, setGender] = useState('');
    const [size, setSize] = useState('');
    const [selectedCheckBox, setSelectCheckBox] = useState([]);
    const [information, setInformation] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [newDog, setNewDog] = useState(null);
    const [isDogCreated, setIsDogCreated] = useState(false);



    const userDetails = useSelector(state => state.userDetails);

    const nameInputHandler = inputName => {
        setName(inputName)
    }
    
    const ageInputHandler = inputAge => {
        setAge(inputAge)
    }

    const raceInputHandler = inputRace => {
        setRace(inputRace)
    }

    const colorInputHandler = inputColor => {
        setColor(inputColor)
    }

    const genderInputHandler = inputGender => {
        setGender(inputGender)
    }

    const sizeInputHandler = inputSize => {
        setSize(inputSize)
    }

    const informationInputHandler = inputInformation => {
        setInformation(inputInformation)
    }
    
    const clickDogHandler = () => {
        const dog = new Dog(userDetails.id ,name, age, race, color, gender, size, selectedCheckBox, information, selectedImage.base64)
        setIsLoading(true);
        createDogHandler(dog)
        .then(createDog => {
            // TODO something with the created dog
            setNewDog(createDog);
            setIsDogCreated(true);
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => {
            setIsLoading(false);
        })

    }
    

    if(isDogCreated)
    {
        return( 
            <DogProfileScreen dog={newDog}/>
        )
    }
    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
            <ScrollView style={{flex: 1}}>
            <Header 
               menuClickEventHandler={props.navigation.toggleDrawer} 
            />
                <Text style={styles.headerText} >נא הזן את פרטי הכלב:</Text>
                <View style={styles.screen}>
                    <View style={styles.inputContainer}>
                        <Input 
                            style={styles.textInput}
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='default'
                            onChangeText={nameInputHandler}
                            placeholder='שם'
                            returnKeyType='next'
                        />
                        <Input 
                            style={styles.textInput}
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='numeric'
                            placeholder='גיל'
                            onChangeText={ageInputHandler}
                        />
                        <Input 
                            style={styles.textInput}
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='next'
                            placeholder='גזע'
                            onChangeText={raceInputHandler}
                        />
                        <Input 
                            style={styles.textInput}
                            autoCapitalize='none'
                            autoCorrect={true}
                            keyboardType='next'
                            placeholder='צבע'
                            onChangeText={colorInputHandler}
                        />
                        <ImgPicker onImageTaken={setSelectedImage} />
                        <RNPickerSelect
                            placeholder={{
                                label: 'בחר מין',
                                value: null,
                                color: '#808080',
                            }}
                            items={[
                                { label: 'זכר', value: 0 },
                                { label: 'נקבה', value: 1 },
                            ]}
                            onValueChange = {genderInputHandler}
                            style={{...pickerSelectStyles, iconContainer: styles.iconContainer}}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => <Ionicons name="md-arrow-down" size={24} color="gray" />}
                        />
                        <RNPickerSelect
                            placeholder={{
                                label: 'בחר גודל',
                                value: null,
                                color: '#808080',
                            }}
                            items={[
                                { label: 'קטן', value: 0 },
                                { label: 'בינוני', value: 1 },
                                { label: 'גדול', value: 2 },
                                ]}
                            onValueChange={sizeInputHandler}
                            style={{...pickerSelectStyles, iconContainer: styles.iconContainer}}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => <Ionicons name="md-arrow-down" size={24} color="gray" />}
                         />
                        <SelectMultiple
                            rowStyle = {styles.CheckBox}
                            items={[{label: 'מחוסן', value: 'Vaccinated'},
                            {label: 'מסורס/ מעוקרת', value: 'Neutered'}]}
                            selectedItems={selectedCheckBox}
                            onSelectionsChange={setSelectCheckBox}
                        />            
                         <Input 
                            multiline={true}
                            style={{...styles.textInput, ...styles.bigTextBox}}
                            autoCapitalize='none'
                            autoCorrect={true}
                            keyboardType='next'
                            placeholder='מידע כללי'
                            onChangeText={informationInputHandler}
                        />
                        {isLoading && <ActivityIndicator />}
                        <MainButton 
                            onPress={clickDogHandler} 
                            buttonStyle={styles.continueButton}
                            linearGradientColor={Colors.mainColor} 
                        >
                            <Text style={styles.continueText}>המשך</Text>
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
    textInput: {
        textAlign: 'center',
        fontSize: 17,
        marginTop: Dimensions.get('window').width / 15,
    },
    bigTextBox: {
        height: 70,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5
    },
    iconContainer: {
        marginTop: Dimensions.get('window').width / 10.5,
        right: Dimensions.get('window').width / 8,
    },
    CheckBox: {
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'row-reverse',
        marginTop: Dimensions.get('window').width / 15,
    },
    inputContainer: {
        flex: 1,
        width: '100%',
        marginBottom: Dimensions.get('window').height / 60
    },
    errorMessage: {
        backgroundColor: 'red',
        opacity: 0.6,
        marginHorizontal: Dimensions.get('window').width / 10,
        alignItems: 'center',
        height: Dimensions.get('window').height / 35,
    },
    errorMessageText: {
        fontSize: 16
    },
    continueButton: {
        borderColor: 'black',
        marginHorizontal: Dimensions.get('window').width / 8,
        height: Dimensions.get('window').height / 18,
        width: '70%',
        marginTop: 10,
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
  

export default CreateDogScreen;
