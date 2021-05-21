import * as chatDataService from './dataServices/chatsDataService';

export const GetMyChats = async () => {
    const chats = await chatDataService.getMyChats();
    return chats;
}