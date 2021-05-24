import {RECEIVE_MESSAGE} from '../actions/Chats';

const initialState = null

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_MESSAGE:
            if(state.hasOwnProperty(action.chatId)){
                state[action.chatId].messages.append(action.messageDetails);
                return state;
            } 
            else {
                state[action.chatId] = {
                    ...action.messageDetails
                }
                return state;
            }
        default:
            return state;
    }
}

export default chatReducer;