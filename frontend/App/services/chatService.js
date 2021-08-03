import store from '../store/Store';
import Constants from 'expo-constants'

import * as chatDataService from './dataServices/chatsDataService';
import {SaveWebSocket} from '../store/actions/WebSocket';
import {ReceiveMessage} from '../store/actions/Chats';

export const GetMyChats = async () => {
    const chats = await chatDataService.getMyChats();
    return chats;
}

export const InitWebSocket = () => {
    const token = store.getState().userDetails.token;
    const webSocket = new WebSocket(Constants.manifest.extra.WebSocketAddress, ["access_token", token]);
    subscribeToMessages(webSocket);
    store.dispatch(SaveWebSocket(webSocket));
}

const subscribeToMessages = webSocket => {
    webSocket.onmessage = message => {
        store.dispatch(ReceiveMessage(JSON.parse(message.data)));
    }
}