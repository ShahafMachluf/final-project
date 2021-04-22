import React, {useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Text } from 'react-native';
import { useDispatch } from 'react-redux';

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
                            //value={number}
                            keyboardType='numeric'
                            //onChangeText={passwordInputHandler}
                            placeholder='גיל'
                            //ref={passwordInput}
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
