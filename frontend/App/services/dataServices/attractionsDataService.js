import Constants from 'expo-constants'

import { Get } from './httpService';

const baseUrl = `${Constants.manifest.extra.APIAddress}/attraction`;

export const getAllAttractions = async () => {
    return Get(baseUrl);
}