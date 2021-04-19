import React, {useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import AuthHeader from '../components/AuthHeader';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import { RegisterEventHandler } from '../services/userService';
import Colors from '../constants/Colors';

const SignupScreen = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const passwordInput = useRef();
    const nameInput = useRef();
    const dispatch = useDispatch();

    const emailInputHandler = email => {
        setEmail(email);
    }

    const passwordInputHandler = password => {
        setPassword(password);
    }

    const nameInputHandler = name => {
        setName(name);
    }

    const navigateToLoginScreen = () => {
        props.navigation.navigate({ 
            routeName: 'Login',
        })
    }

    const signupClickEventHandler = () => {
        setErrorMessage('');
        setIsLoading(true);
        RegisterEventHandler(email, password, name, dispatch)
        .catch(error => {
            setErrorMessage(error.message)
            setIsLoading(false);
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
                            onChangeText={emailInputHandler}
                            placeholder='דוא"ל'
                            returnKeyType='next'
                            onSubmitEditing={() => passwordInput.current.focus() }
                        />
                        <Input 
                            style={styles.input}
                            autoCapitalize='none'
                            autoCorrect={false}
                            value={password}
                            secureTextEntry={true}
                            onChangeText={passwordInputHandler}
                            placeholder='סיסמא'
                            returnKeyType='next'
                            onSubmitEditing={() => nameInput.current.focus() }
                            ref={passwordInput}
                        />
                        <Input 
                            style={styles.input}
                            autoCapitalize='none'
                            autoCorrect={false}
                            value={name}
                            onChangeText={nameInputHandler}
                            placeholder='שם מלא'
                            ref={nameInput}
                        />
                        {getErrorMessage()}
                        <ActivityIndicator animating={isLoading} color="#0000ff" size='large'/>
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
        height: Dimensions.get('window').height / 4,
        width: '100%',
        marginVertical: Dimensions.get('window').height / 25
    },
    input: {
        marginHorizontal: Dimensions.get('window').width / 10,
        textAlign: 'center',
        fontSize: 17
    },
    buttonContainer: {
        height: Dimensions.get('window').height /4,
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
        alignItems: 'center',
        height: Dimensions.get('window').height / 35,
    },
    errorMessageText: {
        fontSize: 16
    }
});

export default SignupScreen;