import {SAVE_WEBSOCKET, REMOVE_WEBSOCKET} from '../actions/WebSocket';

const initialState = null;

const webSocketReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_WEBSOCKET:
            return action.webSocket;
        case REMOVE_WEBSOCKET:
            return null;
        default:
            return state;
    }
}

export default webSocketReducer;