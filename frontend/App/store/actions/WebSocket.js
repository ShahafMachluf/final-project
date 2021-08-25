export const SAVE_WEBSOCKET = "SAVE_WEBSOCKET"
export const REMOVE_WEBSOCKET = "REMOVE_WEBSOCKET"

export const SaveWebSocket = webSocket => {
    return {
        type: SAVE_WEBSOCKET,
         webSocket
    }
}

export const RemoveWebSocket = () => {
    return {
        type: REMOVE_WEBSOCKET
    }
}