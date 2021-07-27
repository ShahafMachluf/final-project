import React, { useState, useCallback, useEffect } from 'react'
import {useSelector} from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat'

import ChatMessage from '../models/ChatMessage';

 const ChatScreen = props => {
  const [messages, setMessages] = useState([]);
  const chat = props.navigation.state.params.chat;
  const webSocket = useSelector(state => state.webSocket);
  const userId = useSelector(state => state.userDetails.id);
  const otherPersonId = getOthePersonId();
  console.log(chat)

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const getOthePersonId = () => {
    return userId === chat.adopter.id ? chat.dogOwner.id : chat.adopter.id 
  }

  webSocket.onmessage = messageEvent => {
    console.log(messageEvent.data);
  }

  const onSend = useCallback((messages = []) => {
    const message = new ChatMessage(userId, otherPersonId, chat.id, messages[0].text);
    
    webSocket.send(JSON.stringify(message));
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
}

export default ChatScreen;``