import store from '../store/Store';
import Constants from 'expo-constants'

import * as chatDataService from './dataServices/chatsDataService';
import {SaveWebSocket} from '../store/actions/WebSocket';
import {ReceiveMessage} from '../store/actions/Chats';

export const GetMyChats = async () => {
    const chats = await chatDataService.getMyChats();
    return chats;
}

export const GetChatMessages = async (chatId) => {
    const chatMessages = await chatDataService.getChatMessages(chatId);
    return chatMessages;
}

export const InitWebSocket = () => {
    const token = store.getState().userDetails.token;
    const webSocket = new WebSocket(Constants.manifest.extra.WebSocketAddress, ["access_token", token]);
    subscribeToMessages(webSocket);
    reconnectOnClose(webSocket);
    store.dispatch(SaveWebSocket(webSocket));
}

export const FetchChatHistory = async chatId => {
    const chatHistory = await chatDataService.getChatHistory(chatId);
    return chatHistory;
}

const subscribeToMessages = webSocket => {
    webSocket.onmessage = message => {
        store.dispatch(ReceiveMessage(JSON.parse(message.data)));
    }
}

const reconnectOnClose = webSocket => {
    webSocket.onclose = () => {
        InitWebSocket();
    }
}