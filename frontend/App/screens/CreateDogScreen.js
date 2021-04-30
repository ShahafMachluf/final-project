import React, {useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, Text, KeyboardAvoidingView, Platform} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Header from '../components/Header';
import Input from '../components/Input';
import { Ionicons } from '@expo/vector-icons';
import SelectMultiple from 'react-native-select-multiple';
import SafeAreaView from 'react-native-safe-area-view';
import ImagePicker from 'react-native-image-picker';
import MainButton from '../components/MainButton';
import {createDogHandler} from '../services/dogService';
import {useSelector} from 'react-redux'
import Dog from '../models/Dog'

const CreateDogScreen = props => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [race, setRace] = useState('');
    const [color, setColor] = useState('');
    const [gender, setGender] = useState('');
    const [size, setSize] = useState('');
    const [selectedCheckBox, setSelectCheckBox] = useState([]);
    const [information, setInformation] = useState('');

    
    const userDetails = useSelector(state => state.auth);

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
        console.log(selectedCheckBox);
        const dog = new Dog(userDetails.id ,name, age, race, color, gender, size, selectedCheckBox, information, "dog")
        createDogHandler(dog)

    }
    
    return (
        <KeyboardAvoidingView
        behavior="padding"
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
            <ScrollView style={{flex: 1}}>
                <View style={styles.screen}>
                    <Header/>
                    <Text style={styles.headerText} >נא הזן את פרטי הכלב:</Text>
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
                            Icon={() => {
                            return <Ionicons name="md-arrow-down" size={24} color="gray" />;
                            }}
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
                            Icon={() => {
                            return <Ionicons name="md-arrow-down" size={24} color="gray" />;
                            }}
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
                            style={{...styles.textInput,height: 70}}
                            autoCapitalize='none'
                            autoCorrect={true}
                            keyboardType='next'
                            placeholder='מידע כללי'
                            onChangeText={informationInputHandler}
                        />

                        <MainButton 
                            onPress={clickDogHandler} 
                            buttonStyle={styles.loginButton} 
                        >
                            <Text style={styles.loginText}>המשך</Text>
                        </MainButton>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    screen: {
    flex: 1,
},
headerText: {
    fontSize: 25,
    color: '#808080', 
    textAlign: "center",
    marginTop: Dimensions.get('window').width / -10,

},
textInput: {
    marginHorizontal: Dimensions.get('window').width / 10,
    textAlign: 'center',
    fontSize: 17,
    marginTop: Dimensions.get('window').width / 15,
},
DropDownInput: {
    marginHorizontal: Dimensions.get('window').width / 10,
    textAlign: 'center',
    fontSize: 17,
    marginTop: Dimensions.get('window').width / 15,
    backgroundColor: 'red',
},
TextStyle: {
    fontSize: 32,
    textAlign: 'center',
},
DropDownOptions: {
    marginTop: Dimensions.get('window').height / 35,
    height:  Dimensions.get('window').height /10,
    backgroundColor: 'green',
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
    marginBottom: Dimensions.get('window').height / 60,
},
buttonContainer: {
    height: Dimensions.get('window').height / 2.5,
    width: '50%',
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
