import React, {useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import Header from '../components/Header';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import Colors from '../constants/Colors';
import { LoginEventHandler } from '../services/userService';
import { resetAction } from '../navigation/AppNavigation'

const LoginScreen = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const passwordInput = useRef();
    const dispatch = useDispatch();

    const emailInputHandler = inputText => {
        setEmail(inputText);
    }

    const passwordInputHandler = inputText => {
        setPassword(inputText);
    }

    

    const loginClickEventHandler = () => {
        setErrorMessage('');
        setIsLoading(true);
        LoginEventHandler(email, password, dispatch)
        .then(isLoggedIn => {
            if(isLoggedIn) {
                //props.navigation.dispatch(resetAction);
                props.navigation.navigate({
                    routeName: 'Main'
                })
            }
        })
        .catch(error => {
            setErrorMessage(error.message);
            setIsLoading(false);
         })
    }

    const navigateToSignup = () => {
        props.navigation.navigate({ 
            routeName: 'Signup'
        })
    }

    const getErrorMessage = () => {
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
                <View style={styles.screen}>
                    <Header 
                        textStyle={styles.headerText}
                        >
                        ברוך הבא!
                    </Header>
                    <View style={styles.inputContainer}>
                        <Input 
                            style={styles.input}
                            autoCapitalize='none'
                            autoCorrect={false}
                            value={email}
                            keyboardType='email-address'
                            onChangeText={emailInputHandler}
                            placeholder='דוא"ל'
                            returnKeyType='next'
                            onSubmitEditing={() => {passwordInput.current.focus(); }}
                        />
                        <Input 
                            style={styles.input}
                            autoCapitalize='none'
                            autoCorrect={false}
                            value={password}
                            secureTextEntry={true}
                            onChangeText={passwordInputHandler}
                            placeholder='סיסמא'
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
                            textStyle={styles.loginText}>
                            התחבר
                        </MainButton>
                        <MainButton 
                            disabled={isLoading}
                            onPress={() => {}}
                            buttonStyle={styles.facebookButton}
                            textStyle={styles.facebookText}>
                            Facebook
                        </MainButton>
                        <MainButton
                            disabled={isLoading}
                            onPress={() => {}}
                            buttonStyle={styles.googleButton}
                            textStyle={styles.googleText}>
                            Google
                        </MainButton>
                        <MainButton 
                            disabled={isLoading}
                            onPress={() => {}}
                            buttonStyle={styles.forgotPasswordButton}
                            textStyle={styles.forgotPasswordText}>
                            שכחת סיסמא?
                        </MainButton>
                        <MainButton 
                            disabled={isLoading}
                            onPress={navigateToSignup}
                            buttonStyle={styles.signupButton}
                            textStyle={styles.signupText}>
                            משתמש חדש? הרשם
                        </MainButton>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

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
        backgroundColor: 'gray'
        // change background color to Peleg's color
    },
    loginText: {
        color: 'white'
    },
    facebookButton: {
        borderColor: Colors.facebook,
        borderWidth: 3,
        marginVertical: 15
    },
    facebookText: {
        color: Colors.facebook
    },
    googleButton: {
        borderColor: Colors.googleRed,
        borderWidth: 3
    },
    googleText: {
        color: Colors.googleRed
    },
    forgotPasswordButton: {
        marginTop: 10
    },
    forgotPasswordText: {
        color: 'grey',
        fontSize: 17
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

export default LoginScreen;