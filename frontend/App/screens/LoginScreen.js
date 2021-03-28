import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Input from '../components/Input';
import MainButton from '../components/MainButton';
import Colors from '../constants/Colors';

const LoginScreen = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailInputHandler = inputText => {
        setEmail(inputText);
    }

    const passwordInputHandler = inputText => {
        setPassword(inputText);
    }

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
            <View style={styles.screen}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>ברוך הבא!</Text>
                    {/* add app logo */}
                </View>
                <View style={styles.inputContainer}>
                    <Input 
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={email}
                        keyboardType='email-address'
                        onChangeText={emailInputHandler}
                        placeholder='דוא"ל'
                    />
                    <Input 
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        value={password}
                        secureTextEntry={true}
                        onChangeText={passwordInputHandler}
                        placeholder='סיסמא'
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <MainButton 
                        onPress={() => {}} 
                        buttonStyle={styles.loginButton} 
                        textStyle={styles.loginText}>
                        התחבר
                    </MainButton>
                    <MainButton 
                        onPress={() => {}}
                        buttonStyle={styles.facebookButton}
                        textStyle={styles.facebookText}>
                        Facebook
                    </MainButton>
                    <MainButton 
                        onPress={() => {}}
                        buttonStyle={styles.googleButton}
                        textStyle={styles.googleText}>
                        Google
                    </MainButton>
                    <MainButton 
                        onPress={() => {}}
                        buttonStyle={styles.forgotPasswordButton}
                        textStyle={styles.forgotPasswordText}>
                        שכחת סיסמא?
                    </MainButton>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        marginTop: 70,
    },
    header: {
        flex: 1
    },
    headerText: {
        fontSize: 40,
        color: 'gray'
    },
    input: {
        marginHorizontal: Dimensions.get('window').width / 10,
        textAlign: 'center',
        fontSize: 17
    },
    inputContainer: {
        flex: 1,
        width: '100%',
        marginVertical: Dimensions.get('window').height / 25
    },
    buttonContainer: {
        flex: 3,
        width: '50%'
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
    warnning: {
        backgroundColor: 'red',
        opacity: 0.6
    }
});

export default LoginScreen;