"use client";

import React, { useState, useEffect } from 'react';
import styles from './chat-wrapper.module.scss';
import { Socket } from 'socket.io-client';
import MessageItem from './messageItem';
import ChatMessage from './interfaces/chatMessage.interface';

interface User {
  uid: number;
  name: string;
  avatar: string;
}

export default function ChatRoom({ socket, channelId}: { socket: Socket, channelId: number | null}) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') {
      return;
    }

    // Send the message to the backend
    socket.emit('sendMessage', {
      channelId: channelId,
      content: inputMessage,
    });

    setInputMessage(''); // Clear the input after sending
  };

  useEffect(() => {
    socket.emit('getChannelMessages', channelId);
    socket.on('getChannelMessages', (messages: ChatMessage[]) => {
      setChatMessages(messages);
    });

    return () => {
      socket.off('getChatMessages');
    };
  }, [socket, channelId]);

  // useEffect(() => {
  //   // 메시지의 발신자 UID를 배열로 만듦
  //   const senderUids = chatMessages.map((message) => message.sender_uid);

  //   // 중복되지 않는 발신자 UID 목록을 가져오기 위해 Set을 사용
  //   const uniqueSenderUids = Array.from(new Set(senderUids));

  //   // 사용자 정보 가져오기
  //   const fetchUsers = async () => {
  //     const fetchedUsers = await Promise.all(uniqueSenderUids.map((uid) => fetchUser(uid)));
  //     setUsers(fetchedUsers.filter((user) => user !== null) as User[]);
  //   };
  //   fetchUsers();
  //   console.log("user: ",users);
  // }, [chatMessages]);

  

  return (
    <div className={styles.chatRoomBox}>
      <div className={styles.chatDisplay}>
            {chatMessages && chatMessages.map((chatMessages) =>
            <MessageItem
              key={chatMessages.id}
              message={chatMessages}
              isMyMessage={chatMessages.sender_uid === 1}
              senderName={"name"}
			        senderProfilePicture={"Avar"}
            />
          )}
      </div>
      <span className={styles.spanSendMessage}>
        <input
		className={styles.inputMessageBox}
		value={inputMessage}
		onChange={(e) => setInputMessage(e.target.value)}
		onKeyDown={(e) => {
		  if (e.key === 'Enter') {
			handleSendMessage();
		  }
		}}
		></input>
        <button className={styles.messageSendBox} onClick={handleSendMessage}>SEND</button>
      </span>
    </div>
  );
}
