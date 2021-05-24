import {SAVE_WEBSOCKET} from '../actions/WebSocket';

const initialState = null;

const webSocketReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_WEBSOCKET:
            return action.webSocket;
        default:
            return state;
    }
}

export default webSocketReducer;