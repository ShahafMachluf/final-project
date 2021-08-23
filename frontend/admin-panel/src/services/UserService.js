import {Post} from './HttpService';
import config from '../config.json';

const baseAddress = `${config.APIAddress}/user`

export const Login = async userDetails => {
    const url = `${baseAddress}/login`;
    const result = await Post(url, userDetails);
    return result;
}