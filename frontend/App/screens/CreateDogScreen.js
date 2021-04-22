import React, {useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';


import AuthHeader from '../components/AuthHeader';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import Colors from '../constants/Colors';

const CreateDogScreen = props => {
    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
            <ScrollView style={{flex: 1}}>
                <View style={styles.screen}>
                    <AuthHeader 
                        textStyle={styles.headerText}
                        >
                        נא הזן את פרטי הכלב:
                    </AuthHeader>
                    <View style={styles.inputContainer}>
                        <Input 
                            style={styles.input}
                            autoCapitalize='none'
                            //autoCorrect={false}
                            //value={text}
                            keyboardType='default'
                            //onChangeText={emailInputHandler}
                            placeholder='שם'
                            returnKeyType='next'
                            //onSubmitEditing={() => {passwordInput.current.focus(); }}
                        />
                        <Input 
                            style={styles.input}
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='numeric'
                            placeholder='גיל'
                        />
                        <Input 
                            style={styles.input}
                            autoCapitalize='none'
                            autoCorrect={false}
                            keyboardType='next'
                            placeholder='גזע'
                        />
                        
                        <DropDownPicker
                            items={[
                                {label: 'קטן', value: 'Small'},
                                {label: 'בינוני', value: 'Medium'},
                                {label: 'גדול', value: 'Large'},
                            ]}
                            style={styles.input}
                            defaultIndex={0}
                            containerStyle={{height: 40}}
                            onChangeItem={item => console.log(item.label, item.value)}
                            placeholder="גודל"
                            labelStyle={{fontSize: 14, color: '#808080', textAlign: "center"}}
                        />

                        <DropDownPicker
                            items={[
                                {label: 'זכר', value: 'Male'},
                                {label: 'נקבה', value: 'Female'},
                            ]}
                            style={styles.input}
                            defaultIndex={0}
                            containerStyle={{height: 40}}
                            onChangeItem={item => console.log(item.label, item.value)}
                            placeholder="מין"
                            labelStyle={{fontSize: 14, color: '#808080', textAlign: "center"}}
                        />
      
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
screen: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10
},
headerText: {
    fontSize: 25
},
input: {
    marginHorizontal: Dimensions.get('window').width / 10,
    textAlign: 'center',
    fontSize: 17
},
inputContainer: {
    height: Dimensions.get('window').height / 6,
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

export default CreateDogScreen;
