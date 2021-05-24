import {RECEIVE_MESSAGE, INIT_CHAT, REMOVE_READ_MESSAGES} from '../actions/Chats';

const initialState = {}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_MESSAGE:            
            const messages = [...state[action.messageDetails.chatId].messages];
            messages.push(action.messageDetails);
            return {
                ...state,
                [action.messageDetails.chatId]: {
                    messages: [...messages] 
                }
            }
        case INIT_CHAT:
            if(!state[action.messageDetails.chatId]) {
                const newState = {
                    ...state
                }
                newState[action.messageDetails.chatId] = {
                    messages: []
                }
                return newState;
            }

            return state;
        case REMOVE_READ_MESSAGES:
            const newMessages = state[action.chatId].messages.slice(action.readCount);
            return {
                ...state,
                [action.chatId]: {
                    messages: [...newMessages] 
                }
            }
        default:
            return state;
    }
}

export default chatReducer;