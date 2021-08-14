import Constants from 'expo-constants'

import { Post, Get } from './httpService';

const baseUrl = `${Constants.manifest.extra.APIAddress}/chat`;


export const getMyChats = () => {
    return Get(baseUrl);
}

export const getChatMessages = (chatId) => {
    const url = `${baseUrl}/${chatId}`;
    return Get(url);
}

export const getChatHistory = chatId => {
    return Get(`${baseUrl}/${chatId}`);
}