import Constants from 'expo-constants'

import { Post } from './httpService';

const baseUrl = `${Constants.manifest.extra.APIAddress}/dog`;



export const createDog = (dog) => {
    const url = `${baseUrl}/createDog`;
    return Post(url, dog);
}