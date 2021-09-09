import {Post, Get, Delete} from './HttpService';
import config from '../config.json';

const baseAddress = `${config.APIAddress}/admin`;

export const GetAllDogs = async () => {
    const url = `${baseAddress}/dogs`
    const result = await Get(url);
    return result;
}

export const GetAllUsers = async () => {
    const url = `${baseAddress}/users`;
    const result = await Get(url);
    return result;
}

export const GetAllAttractions = async () => {
    const url = `${baseAddress}/attractions`;
    const result = await Get(url);
    return result;
}

export const Login = async userDetails => {
    const url = `${baseAddress}/login`;
    const result = await Post(url, userDetails);
    return result;
}

export const RemoveDog = async dogId => {
    const url = `${baseAddress}/dog/${dogId}`;
    const result = await Delete(url);
    return result;
}

export const RemoveUser = async userId => {
    const url = `${baseAddress}/user/${userId}`;
    const result = await Delete(url);
    return result;
}

export const RemoveAttrction = async attractionId => {
    const url = `${baseAddress}/attraction/${attractionId}`;
    const result = await Delete(url);
    return result;
}

export const AddAttraction = async attractionDetails => {
    const url = `${baseAddress}/attraction`;
    const result = await Post(url, attractionDetails);
    return result;
}