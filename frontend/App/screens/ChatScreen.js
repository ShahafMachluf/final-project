import React, { useState, useCallback, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat'

import ChatMessage from '../models/ChatMessage';
import {InitChat, RemoveReadMessages} from '../store/actions/Chats';

 const ChatScreen = props => {
  const [messages, setMessages] = useState([]);
  const currentChatDetails = props.navigation.state.params.chat;
  const webSocket = useSelector(state => state.webSocket);
  const userId = useSelector(state => state.userDetails.id);
  const chatMessages = useSelector(state => state.chats[currentChatDetails.id].messages);
  const otherPersonId = userId === currentChatDetails.adopter.id ? currentChatDetails.dogOwner.id : currentChatDetails.adopter.id;
  const dispatch = useDispatch();

  /*
  
  TODO:
    - sort messages by time if received many
    - handle socket disconnect request
    - add notifications for new chat messages
    - fetch chat history on this page startup
  */

  useEffect(() => {
    if(chatMessages.length > 0) {
    const convertedMessages = [];
      chatMessages.forEach(message => {
        convertedMessages.push(convertMessageFromServer(message));
      });

      setMessages(previousMessages => GiftedChat.append(previousMessages, convertedMessages));
      dispatch(RemoveReadMessages(convertedMessages.length, currentChatDetails.id));
    }
  }, [chatMessages])

  const convertMessageFromServer = message => {
    return {
      _id: message.id,
      text: message.message,
      createdAt: message.time,
      user: {
        _id: message.fromUserId,
      }
    }
  }

  const onSend = useCallback((messages = []) => {
    const message = new ChatMessage(userId, otherPersonId, currentChatDetails.id, messages[0].text);
    webSocket.send(JSON.stringify(message));
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: userId,
      }}
    />
  )
}

export default ChatScreen;