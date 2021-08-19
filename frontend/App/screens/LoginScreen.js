import React, {useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import AuthHeader from '../components/AuthHeader';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import Colors from '../constants/Colors';
import * as userService from '../services/userService';
import Loader from '../components/Loader';

const LoginScreen = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const passwordInput = useRef();
    const dispatch = useDispatch();

    const isValidInput = () => {
        const validEmail = userService.isValidEmail(email);
        if(!validEmail) {
            setEmailErrorMessage('דוא"ל לא תקין')
        }

        const validPassword = userService.isValidPassword(password);
        if(!validPassword) {
            setPasswordErrorMessage('אורך סיסמא הינו לפחות 6 תווים')
        }

        return validEmail && validPassword;
    }

    const loginClickEventHandler = () => {
        setServerErrorMessage('');
        setEmailErrorMessage('');
        setPasswordErrorMessage('');

        const validInput = isValidInput();
        if(validInput) {
            setIsLoading(true);
            userService.LoginEventHandler(email, password, dispatch)
            .catch(error => {
                setServerErrorMessage(error.message);
                setIsLoading(false);
            })
        }
    }

    const navigateToSignup = () => {
        props.navigation.navigate({ 
            routeName: 'Signup'
        })
    }

    const navigateToForgotPassword = () => {
        props.navigation.navigate({ 
            routeName: 'ForgotPassword'
        })
    }

    const getErrorMessage = (errorMessage) => {
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
                    <AuthHeader 
                        textStyle={styles.headerText}
                        >
                        ברוך הבא!
                    </AuthHeader>
                    <View style={styles.inputContainer}>
                        <Input 
                            style={styles.input}
                            autoCapitalize='none'
                            autoCorrect={false}
                            value={email}
                            keyboardType='email-address'
                            onChangeText={setEmail}
                            placeholder='דוא"ל'
                            returnKeyType='next'
                            onSubmitEditing={() => {passwordInput.current.focus(); }}
                        />
                        {getErrorMessage(emailErrorMessage)}
                        <Input 
                            style={styles.input}
                            autoCapitalize='none'
                            autoCorrect={false}
                            value={password}
                            secureTextEntry={true}
                            onChangeText={setPassword}
                            placeholder='סיסמא'
                            ref={passwordInput}
                        />
                        {getErrorMessage(passwordErrorMessage)}
                        {getErrorMessage(serverErrorMessage)}
                        <Loader active={isLoading} />
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
                            onPress={navigateToForgotPassword}
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
        flex: 1,
        width: '100%',
        marginBottom: Dimensions.get('window').height / 60,
    },
    buttonContainer: {
        flex: 2,
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

export default LoginScreen;