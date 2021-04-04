import React, {useState} from 'react';
import { View, ScrollView, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';

import Header from '../components/Header';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import Colors from '../constants/Colors';
import { Login } from '../services/dataServices/userDataService';
import { saveUserDetails } from '../store/actions/auth';

const LoginScreen = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const emailInputHandler = inputText => {
        setEmail(inputText);
    }

    const passwordInputHandler = inputText => {
        setPassword(inputText);
    }

    

    const loginClickEventHandler = () => {
        // TODO
        // validate email & password conditions
        setIsLoading(true);
        Login(email, password).then(userDetails => {
            dispatch(saveUserDetails(userDetails));
            // navigate to home screen
        }).catch(error => {
            setIsLoading(false);
            // do somethiong with the error
        });
    }

    const navigateToSignup = () => {
        props.navigation.navigate({ 
            routeName: 'Signup'
        })
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
        height: Dimensions.get('window').height / 5,
        width: '100%',
        marginVertical: Dimensions.get('window').height / 30
    },
    buttonContainer: {
        height: Dimensions.get('window').height / 2.5,
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
    signupButton: {
        marginTop: 5
    },
    signupText: {
        color: 'grey',
        fontSize: 17
    },
    warnning: {
        backgroundColor: 'red',
        opacity: 0.6
    }
});

export default LoginScreen;