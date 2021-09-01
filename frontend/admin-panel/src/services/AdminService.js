import {Post, Get} from './HttpService';
import config from '../config.json';

const baseAddress = `${config.APIAddress}/admin`;

export const GetAllDogs = async () => {
    const url = `${baseAddress}/dogs`
    const result = await Get(url);
    return result;
}

export const Login = async userDetails => {
    const url = `${baseAddress}/login`;
    const result = await Post(url, userDetails);
    return result;
}