import Constants from 'expo-constants'

import { Post } from './httpService';

const baseUrl = `${Constants.manifest.APIAddress}/user`;

export const Login = (email, password) => {
    const url = `${baseUrl}/login`;
    return Post(url, {email, password});
}

export const Register = (email, password, fullName) => {
    const url = `${baseUrl}/register`;
    return Post(url, {email, password, fullName});
}

export const FacebookLogin = () => {

}

export const GoogleLogin = () => {

}

export const ResetPassword = () => {
    
}