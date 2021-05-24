export default class ChatMessage {
    constructor(fromUserId, toUserId, chatId, message) {
        this.fromUserId = fromUserId;
        this.toUserId = toUserId;
        this.chatId = chatId;
        this.time = new Date();
        this.message = message;
    }
}