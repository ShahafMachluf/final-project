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
                            autoCorrect={false}
                            value={text}
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
                            value={number}
                            keyboardType='numeric'
                            //onChangeText={passwordInputHandler}
                            placeholder='גיל'
                            ref={passwordInput}
                        />
                        {getErrorMessage()}
                        <ActivityIndicator animating={isLoading} color="#0000ff" size='large'/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <MainButton 
                            disabled={isLoading}
                            onPress={loginClickEventHandler} 
                            buttonStyle={styles.loginButton} 
                            linearGradientColor={Colors.mainColor}
                        >
                            <Text style={styles.loginText}>התחבר</Text>
                        </MainButton>
                        <MainButton 
                            disabled={isLoading}
                            onPress={() => {}}
                            buttonStyle={styles.facebookButton}
                            textStyle={styles.facebookText}
                        >
                            <Text style={styles.facebookText}>Facebook</Text>
                        </MainButton>
                        <MainButton
                            disabled={isLoading}
                            onPress={() => {}}
                            buttonStyle={styles.googleButton}
                            textStyle={styles.googleText}
                        >
                            <Text style={styles.googleText}>Google</Text>
                        </MainButton>
                        <MainButton 
                            disabled={isLoading}
                            onPress={() => {}}
                            buttonStyle={styles.forgotPasswordButton}
                        >
                            <Text style={styles.forgotPasswordText}>שכחת סיסמא?</Text>
                        </MainButton>
                        <MainButton 
                            disabled={isLoading}
                            onPress={navigateToSignup}
                            buttonStyle={styles.signupButton}
                            textStyle={styles.signupText}
                        >
                            <Text style={styles.signupText}>משתמש חדש? הרשם</Text>
                        </MainButton>
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
    fontSize: 40
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
loginButton: {
    borderColor: 'black',
},
loginText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
},
facebookButton: {
    borderColor: Colors.facebook,
    borderWidth: 3,
    marginVertical: 15
},
facebookText: {
    color: Colors.facebook,
    fontSize: 20,
    textAlign: 'center'
},
googleButton: {
    borderColor: Colors.googleRed,
    borderWidth: 3
},
googleText: {
    color: Colors.googleRed,
    fontSize: 20,
    textAlign: 'center'
},
forgotPasswordButton: {
    marginTop: 10
},
forgotPasswordText: {
    color: 'grey',
    fontSize: 17,
    textAlign: 'center'
},
signupButton: {
    marginTop: 5
},
signupText: {
    color: 'grey',
    fontSize: 17
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
