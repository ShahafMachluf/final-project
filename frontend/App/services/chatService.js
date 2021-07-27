import store from '../store/Store';

import * as chatDataService from './dataServices/chatsDataService';
import {SaveWebSocket} from '../store/actions/WebSocket';


export const GetMyChats = async () => {
    const chats = await chatDataService.getMyChats();
    return chats;
}

export const InitWebSocket = () => {
    const token = store.getState().userDetails.token;
    const webSocket = new WebSocket('ws://192.168.1.19:45455',["access_token", token]);
    store.dispatch(SaveWebSocket(webSocket));
}