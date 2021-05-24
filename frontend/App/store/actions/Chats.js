export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const INIT_CHAT = 'INIT_CHAT';
export const REMOVE_READ_MESSAGES = 'REMOVE_READ_MESSAGES';

export const ReceiveMessage = message => {
    return {
        type: RECEIVE_MESSAGE,
        messageDetails: {
            ...message
        }
    }
}

export const InitChat = chatId => {
    return {
        type: INIT_CHAT,
        messageDetails: {
            chatId
        }
    }
}

export const RemoveReadMessages = (readCount, chatId) => {
    return {
        type: REMOVE_READ_MESSAGES,
        readCount,
        chatId
    }
}