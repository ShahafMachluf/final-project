import Constants from 'expo-constants'

import { Post, Put } from './httpService';

const baseUrl = `${Constants.manifest.extra.APIAddress}/user`;

export const Login = (email, password) => {
    const url = `${baseUrl}/login`;
    return Post(url, {email, password});
}

export const Register = (email, password, fullName) => {
    const url = `${baseUrl}/register`;
    return Post(url, {email, password, fullName});
}

export const UploadImage = profilePictureModel => {
    const url = `${baseUrl}/profilePicture`
    return Post(url, profilePictureModel);
}

export const UpdateMaxDistance = maxDistance => {
    const url = `${baseUrl}/maxDistance`;
    return Put(url, maxDistance);
}

export const FacebookLogin = () => {

}

export const GoogleLogin = () => {

}

export const ResetPassword = () => {
    
}