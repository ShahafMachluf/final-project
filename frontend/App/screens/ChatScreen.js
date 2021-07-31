import React, { useState, useCallback, useEffect } from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import {useSelector, useDispatch} from 'react-redux';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import { Ionicons } from '@expo/vector-icons';

import ChatMessage from '../models/ChatMessage';
import {InitChat, RemoveReadMessages} from '../store/actions/Chats';
import ChatHeader from '../components/ChatHeader';
import { FetchChatHistory } from '../services/chatService';

 const ChatScreen = props => {
  const [messages, setMessages] = useState([]);
  const [isFetchedMessages, setIsFetchedMessages] = useState(false);
  const currentChatDetails = props.navigation.state.params.chat;
  const webSocket = useSelector(state => state.webSocket);
  const userDetails = useSelector(state => state.userDetails);
  const chatMessages = useSelector(state => state.chats[currentChatDetails.id].messages);
  const otherPerson = userDetails.id === currentChatDetails.adopter.id ? currentChatDetails.dogOwner : currentChatDetails.adopter;
  const dispatch = useDispatch();

  /*
  
  TODO:
    - add notifications for new chat messages
    - fix avatar on loaded messages
  */

  useEffect(() => {
    if(!isFetchedMessages && messages.length === 0) {
      onChatOpen()
    }
    else if(chatMessages.length > 0) {
      handleNewMessages();
    }
  }, [chatMessages])

const onChatOpen = async () => {
  const chatHistory = await FetchChatHistory(currentChatDetails.id);
  const convertedMessages = convertMessageArray(chatHistory);

  if(chatMessages.length > 0) {
    const newMessages = convertMessageArray(chatMessages);
    dispatch(RemoveReadMessages(newMessages.length, currentChatDetails.id));
    newMessages.forEach(newMessage => {
      if(!convertedMessages.some(m => m._id === newMessage._id)) {
        convertedMessages.push(newMessage);
      }
    })
  }

  convertedMessages.sort((msg1, msg2) => msg1.createdAt > msg2.createdAt ? -1 : 1);
  setMessages(previousMessages => GiftedChat.append(previousMessages, convertedMessages));
  setIsFetchedMessages(true);
}

const handleNewMessages = () => {
  const newMessages = convertMessageArray(chatMessages);
  newMessages.sort((msg1, msg2) => msg1.createdAt > msg2.createdAt ? -1 : 1);
  setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  dispatch(RemoveReadMessages(newMessages.length, currentChatDetails.id));
}

const convertMessageArray = messageArray => {
  const convertedMessages = [];
  messageArray.forEach(message => {
    convertedMessages.push(convertMessageFromServer(message));
  });

  return convertedMessages;
}

  const convertMessageFromServer = message => {
    return {
      _id: message.id,
      text: message.message,
      createdAt: message.time,
      user: {
        _id: message.fromUserId,
        avatar: !!otherPerson.imageUrl ? otherPerson.imageUrl : require('../assets/no-profile-picture.jpg')
      }
    }
  }

  const onSend = useCallback((messages = []) => {
    const message = new ChatMessage(userDetails.id, otherPerson.id, currentChatDetails.id, messages[0].text);
    webSocket.send(JSON.stringify(message));
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const bubble = (messageInfo) => {
    return (
      <Bubble
      {...messageInfo}
      textStyle={{
        right: {
          color: 'white'
        },
        left: {
          color: '#24204F'
        },
      }}
      wrapperStyle={{
        left: {
          backgroundColor: '#E6F5F3',
        },
        right: {
          backgroundColor: "#3A13C3",
        },
      }}
    />
    )
  }

  const sendButton = (chatDetails) => {
    return (
      <View style={styles.sendButton}>
        <Send 
        {...chatDetails}
        
        >
          <Ionicons name='send' size={20} color={"#3A13C3"} />
        </Send>
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <ChatHeader
        title={otherPerson.fullName}
        onBackIconPress={props.navigation.pop}
      />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        showUserAvatar={true}
        renderBubble={bubble}
        renderSend={sendButton}
        placeholder='הקלד...'
        alwaysShowSend={true}
        user={{
          _id: userDetails.id,
          name: userDetails.fullName,
          avatar: !!userDetails.imageUrl ? userDetails.imageUrl : require('../assets/no-profile-picture.jpg')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 25
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 15,
    bottom: 12
  }
})

export default ChatScreen;