import Constants from 'expo-constants'
import { get } from 'react-native/Libraries/Utilities/PixelRatio';

import { Get } from './httpService';

const baseUrl = `${Constants.manifest.extra.APIAddress}/attraction`;

export const getAllAttractions = async () => {
    return Get(baseUrl);
}

export const getAttractionsWithSameType = async (type) =>{
    const url = `${baseUrl}/kind`;
    return Get(url, type);
}