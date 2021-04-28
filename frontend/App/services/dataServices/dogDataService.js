import Constants from 'expo-constants'

import { Post } from './httpService';

const baseUrl = `${Constants.manifest.extra.APIAddress}/dog`;



export const createDog = (ownerId, name, age, race, color, gender) => {
    const url = `${baseUrl}/createDog`;
    return Post(url, {ownerId, name, age, race, color, gender});
}