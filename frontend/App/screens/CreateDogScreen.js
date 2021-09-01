import React, {useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, TextInput, Dimensions, TouchableWithoutFeedback, Keyboard, Text,Platform, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
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
import Loader from '../components/Loader';
import { color } from 'react-native-reanimated';
import KeyboardShift from '../components/KeyboardShift';

const CreateDogScreen = props => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [race, setRace] = useState('');
    const [color, setColor] = useState('');
    const [gender, setGender] = useState('');
    const [size, setSize] = useState('');
    const [area, setArea] = useState('');
    const [selectedCheckBox, setSelectCheckBox] = useState([]);
    const [information, setInformation] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const nameInput = useRef();
    const ageInput = useRef();
    const raceInput = useRef();
    const colorInput = useRef();
    const imageInput = useRef();
    const additionalInput = useRef();
    
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [ageErrorMessage, setAgeErrorMessage] = useState('');
    const [raceErrorMessage, setRaceErrorMessage] = useState('');
    const [colorErrorMessage, setColorErrorMessage] = useState('');
    const [genderErrorMessage, setGenderErrorMessage] = useState('');
    const [sizeErrorMessage, setSizeErrorMessage] = useState('');
    const [imageErrorMessage, setImageErrorMessage] = useState('');
    const [AreaErrorMessage, setAreaErrorMessage] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);

    const userDetails = useSelector(state => state.userDetails);

    const clearForm = () => {
        nameInput.current.clear();
        ageInput.current.clear();
        raceInput.current.clear();
        colorInput.current.clear();
        imageInput.current.clear();
        additionalInput.current.clear();
        setSelectCheckBox([]);
        setGender(null);
        setSize(null);
        setArea(null);
    } 

    const clearErrorMessages = () => {
        setNameErrorMessage('');
        setAgeErrorMessage('');
        setRaceErrorMessage('');
        setColorErrorMessage('');
        setGenderErrorMessage('');
        setSizeErrorMessage('');
        setAreaErrorMessage('');
        setImageErrorMessage('');
    }
    
    const validateForm = () => {
        let validForm = true;
        if(name.length === 0) {
            setNameErrorMessage('נדרש');
            validForm = false;
        }
        if(age.length === 0 || isNaN(age) || age < 0) {
            setAgeErrorMessage('נדרש, יש לזין ספרות בלבד');
            validForm = false;
        }
        if(race.length === 0) {
            setRaceErrorMessage('נדרש');
            validForm = false
        }
        if(color.length === 0) {
            setColorErrorMessage('נדרש');
            validForm = false;
        }
        if(gender.length === 0) {
            setGenderErrorMessage('נדרש');
            validForm = false;
        }
        if(size.length === 0) {
            setSizeErrorMessage('נדרש');
            validForm = false;
        }
        if(selectedImage === null) {
            setImageErrorMessage('נדרש');
            validForm = false;
        }
        if(area.length === 0) {
            setImageErrorMessage('נדרש');
            validForm = false;
        }

        return validForm;
    }

    const clickDogHandler = () => {
        clearErrorMessages();
        const isValidForm = validateForm();
        if(isValidForm) {
            const dog = new Dog(userDetails.id ,name, age, race, color, gender, size,area, selectedCheckBox, information, selectedImage.base64)
            setIsLoading(true);
            createDogHandler(dog)
            .then(createdDog => {
                clearForm();
                props.navigation.navigate({ 
                    routeName: 'DogProfile',
                    params: {
                        dog: createdDog
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false);
            })
        }
    }

    const getErrorMessage = errorMessage => {
        if(errorMessage.length > 0) {
            return (
                <View style={styles.errorMessage}>
                    <Text style={styles.errorMessageText}>{errorMessage}</Text>
                </View>
            )
        }
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
                                onChangeText={setName}
                                placeholder='שם'
                                returnKeyType='next'
                                ref={nameInput}
                                onSubmitEditing={() => ageInput.current.focus() }
                            />
                            {getErrorMessage(nameErrorMessage)}
                            <Input 
                                style={styles.textInput}
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='numeric'
                                placeholder='גיל'
                                onChangeText={setAge}
                                returnKeyType='next'
                                ref={ageInput}
                                onSubmitEditing={() => raceInput.current.focus() }
                            />
                            {getErrorMessage(ageErrorMessage)}
                            <Input 
                                style={styles.textInput}
                                autoCapitalize='none'
                                autoCorrect={false}
                                returnKeyType='next'
                                placeholder='גזע'
                                onChangeText={setRace}
                                ref={raceInput}
                                onSubmitEditing={() => colorInput.current.focus() }
                            />
                            {getErrorMessage(raceErrorMessage)}
                            <Input 
                                style={styles.textInput}
                                autoCapitalize='none'
                                autoCorrect={true}
                                returnKeyType='next'
                                placeholder='צבע'
                                onChangeText={setColor}
                                ref={colorInput}
                            />
                            {getErrorMessage(colorErrorMessage)}
                            <ImgPicker onImageTaken={setSelectedImage} ref={imageInput} />
                            {getErrorMessage(imageErrorMessage)}
                            <RNPickerSelect
                                value={gender}
                                placeholder={{
                                    label: 'בחר מין',
                                    value: null,
                                    color: '#808080',
                                }}
                                items={[
                                    { label: 'זכר', value: 0 },
                                    { label: 'נקבה', value: 1 },
                                ]}
                                onValueChange = {setGender}
                                style={{...pickerSelectStyles, iconContainer: styles.iconContainer}}
                                useNativeAndroidPickerStyle={false}
                                Icon={() => <Ionicons name="md-arrow-down" size={24} color="gray" />}
                            />
                            {getErrorMessage(genderErrorMessage)}
                            <RNPickerSelect
                                value={size}
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
                                onValueChange={setSize}
                                style={{...pickerSelectStyles, iconContainer: styles.iconContainer}}
                                useNativeAndroidPickerStyle={false}
                                Icon={() => <Ionicons name="md-arrow-down" size={24} color="gray" />}
                            />
                            <RNPickerSelect
                                value={area}
                                placeholder={{
                                    label: 'בחר אזור בארץ',
                                    value: null,
                                    color: '#808080',
                                }}
                                items={[
                                    { label: 'צפון', value: 0 },
                                    { label: 'מרכז', value: 1 },
                                    { label: 'השרון', value: 2 },
                                    { label: 'ירושלים', value: 3 },
                                    { label: 'דרום', value: 4 },
                                    ]}
                                onValueChange={setArea}
                                style={{...pickerSelectStyles, iconContainer: styles.iconContainer}}
                                useNativeAndroidPickerStyle={false}
                                Icon={() => <Ionicons name="md-arrow-down" size={24} color="gray" />}
                            />
                            {getErrorMessage(sizeErrorMessage)}
                            <SelectMultiple
                                rowStyle = {styles.CheckBox}
                                items={[{label: 'מחוסן', value: 'Vaccinated'},
                                {label: 'מסורס/ מעוקרת', value: 'Neutered'}]}
                                selectedItems={selectedCheckBox}
                                onSelectionsChange={setSelectCheckBox}
                            /> 
                            <KeyboardAvoidingView behavior={Platform.Os == "ios" ? "padding" : "height"}>       
                            <Input 
                                multiline={true}
                                style={{...styles.textInput, ...styles.bigTextBox}}
                                autoCapitalize='none'
                                autoCorrect={true}
                                placeholder='מידע כללי'
                                onChangeText={setInformation}
                                ref={additionalInput}
                            />
                            </KeyboardAvoidingView>
                            {isLoading &&  <Loader active={isLoading} />}
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
        backgroundColor: color.mainColor
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
    },
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
