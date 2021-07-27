export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

const ReceiveMessage = message => {
    return {
        type: RECEIVE_MESSAGE,
        messageDetails: {
            ...message
        }
    }
}