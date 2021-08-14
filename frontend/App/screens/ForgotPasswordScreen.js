import React, {useState} from 'react';
import { Modal, Text, StyleSheet, View, Dimensions } from 'react-native';

import AuthHeader from '../components/AuthHeader';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import Colors from '../constants/Colors';
import Loader from '../components/Loader';
import { isValidEmail, resetPassword } from '../services/userService';

const ForgotPasswordScreen = props => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalButtonText, setmodalButtonText] = useState('');

    const resetPasswordClickEventHandler = async () => {
        setIsLoading(true);
        try {
            await resetPassword(email);
            setModalMessage('סיסמתך אופסה ונשלחה בדוא"ל.');
            setmodalButtonText('חזור לעמוד ההתחברות')
        } catch (error) {
            setModalMessage(error.message);
            setmodalButtonText('סגור')
        } finally {
            setIsLoading(false);
            setShowModal(true);
        }
    }

    const onModalButtonPress = () => {
        setShowModal(false);
        setEmail('');

        if(modalButtonText === 'חזור לעמוד ההתחברות') {
            props.navigation.navigate({ 
                routeName: 'Login'
            })
        } 
    }

    return(
        <View style={styles.screen}>
            <AuthHeader textStyle={styles.headerText} >
                אפס סיסמא
            </AuthHeader>
            <Input
                style={styles.input}
                autoCapitalize='none'
                autoCorrect={false}
                value={email}
                keyboardType='email-address'
                onChangeText={setEmail}
                placeholder='דוא"ל'
            />
            <Loader active={isLoading}/>
            <View style={styles.buttonContainer}>
                <MainButton 
                    disabled={isLoading || !isValidEmail(email)}
                    onPress={resetPasswordClickEventHandler} 
                    linearGradientColor={Colors.mainColor}
                >
                    <Text style={styles.buttonText}>אפס סיסמא</Text>
                </MainButton>
            </View>
            <Modal
                animationType='fade'
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{modalMessage}</Text>
                        <MainButton
                            onPress={onModalButtonPress}
                            buttonStyle={styles.modalButton}
                            linearGradientColor={Colors.mainColor}
                        >
                            <Text style={styles.modalButtonText}>{modalButtonText}</Text>
                        </MainButton>
                    </View>
                </View>
            </Modal>

        </View>
    )

} 

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    headerText: {
        fontSize: 40
    },
    input: {
        marginHorizontal: Dimensions.get('window').width / 10,
        textAlign: 'center',
        fontSize: 17
    },
    buttonContainer: {
        marginHorizontal: Dimensions.get('window').width / 4
    }, 
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 20
    }, 
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalButton: {
        paddingHorizontal: 12
    },
    modalButtonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    }
});

export default ForgotPasswordScreen;