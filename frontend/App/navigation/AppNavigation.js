import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const AppNaviation = createStackNavigator({
    Login: LoginScreen,
    Signup: SignupScreen
});

export default createAppContainer(AppNaviation);