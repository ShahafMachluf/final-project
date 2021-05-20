import React, {useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import AuthHeader from '../components/AuthHeader';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import * as userService from '../services/userService';
import Colors from '../constants/Colors';
import Loader from '../components/Loader'; 

const SignupScreen = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [serverErrorMessage, setServerErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const passwordInput = useRef();
    const nameInput = useRef();
    const dispatch = useDispatch();

    const navigateToLoginScreen = () => {
        props.navigation.navigate({ 
            routeName: 'Login',
        })
    }

    const isValidInput = () => {
        const validEmail = userService.isValidEmail(email);
        if(!validEmail) {
            setEmailErrorMessage('דוא"ל לא תקין')
        }

        const validPassword = userService.isValidPassword(password);
        if(!validPassword) {
            setPasswordErrorMessage('אורך סיסמא הינו לפחות 6 תווים')
        }

        const isValidName = userService.isValidName(name);
        if(!isValidName) {
            setNameErrorMessage('יש להזין שם')
        }

        return validEmail && validPassword && isValidName;
    }

    const signupClickEventHandler = () => {
        setServerErrorMessage('');
        setEmailErrorMessage('');
        setPasswordErrorMessage('');
        setNameErrorMessage('');

        const validInput = isValidInput();
        if(validInput) {
            setIsLoading(true);
            userService.RegisterEventHandler(email, password, name, dispatch)
            .catch(error => {
                setServerErrorMessage(error.message)
                setIsLoading(false);
            })
        }
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

    return(
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
            <ScrollView>
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
                            onSubmitEditing={() => passwordInput.current.focus() }
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
                            returnKeyType='next'
                            onSubmitEditing={() => nameInput.current.focus() }
                            ref={passwordInput}
                        />
                        {getErrorMessage(passwordErrorMessage)}
                        <Input 
                            style={styles.input}
                            autoCapitalize='none'
                            autoCorrect={false}
                            value={name}
                            onChangeText={setName}
                            placeholder='שם מלא'
                            ref={nameInput}
                        />
                        {getErrorMessage(nameErrorMessage)}
                        {getErrorMessage(serverErrorMessage)}
                        <Loader active={isLoading} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <MainButton 
                            disabled={isLoading}
                            onPress={signupClickEventHandler} 
                            buttonStyle={styles.signupButton}
                            linearGradientColor={Colors.mainColor}
                        >
                            <Text style={styles.signupText}>הרשמה</Text>
                        </MainButton>
                        <MainButton 
                            disabled={isLoading}
                            onPress={navigateToLoginScreen}  
                            buttonStyle={styles.loginButton}
                        >
                            <Text style={styles.loginText}>משתמש קיים? התחבר</Text>
                        </MainButton>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
    },
    headerText: {
        fontSize: 40
    },
    inputContainer: {
        flex: 2,
        width: '100%'
    },
    input: {
        marginHorizontal: Dimensions.get('window').width / 10,
        textAlign: 'center',
        fontSize: 17
    },
    buttonContainer: {
        flex: 1,
        width: '50%'
    },
    signupButton: {
        borderColor: 'black'
    }, 
    signupText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    loginButton: {
        marginTop: 10
    },
    loginText: {
        color: 'grey',
        fontSize: 17,
        textAlign: 'center'
    },
    errorMessage: {
        backgroundColor: 'red',
        opacity: 0.6,
        marginHorizontal: Dimensions.get('window').width / 10,
        marginBottom: 10,
        alignItems: 'center',
        height: Dimensions.get('window').height / 35,
    },
    errorMessageText: {
        fontSize: 16
    }
});

export default SignupScreen;