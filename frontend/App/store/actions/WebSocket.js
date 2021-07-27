export const SAVE_WEBSOCKET = "SAVE_WEBSOCKET"

export const SaveWebSocket = webSocket => {
    return {
        type: SAVE_WEBSOCKET,
         webSocket
    }
}