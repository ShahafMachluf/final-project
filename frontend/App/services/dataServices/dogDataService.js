import Constants from 'expo-constants'

import { Post, Get } from './httpService';

const baseUrl = `${Constants.manifest.extra.APIAddress}/dog`;


export const createDog = (dog) => {
    const url = `${baseUrl}/createDog`;
    return Post(url, dog);
}

export const getAllDogs = () => {
    return Get(baseUrl);
}

export const reactToDog = (reaction) => {
    const url = `${baseUrl}/react`;
    return Post(url, reaction);
}

export const getLikedDogs = () => {
    const url = `${baseUrl}/liked`;
    return Get(url);
}