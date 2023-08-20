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

export default function ChatRoom({ socket, channelId }: { socket: Socket, channelId: number | null }) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [myUid, setMyUid] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');

  // API 호출해서 사용자 정보 가져오는 함수
  const fetchUser = async (uid: number) => {
    try {
      const response = await fetch(`/api/users/${uid}`); // API 엔드포인트에 맞게 수정
      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  };

  socket.emit('getMyUid');
  socket.on('getMyUid', (uid: number) => {
    setMyUid(uid);
  });

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
    socket.emit('getChatMessages', channelId);
    socket.on('getChatMessages', (messages: ChatMessage[]) => {
      setChatMessages(messages);
    });

    return () => {
      socket.off('getChatMessages');
    };
  }, [socket, channelId]);

  useEffect(() => {
    // 메시지의 발신자 UID를 배열로 만듦
    const senderUids = chatMessages.map((message) => message.sender_uid);

    // 중복되지 않는 발신자 UID 목록을 가져오기 위해 Set을 사용
    const uniqueSenderUids = Array.from(new Set(senderUids));

    // 사용자 정보 가져오기
    const fetchUsers = async () => {
      const fetchedUsers = await Promise.all(uniqueSenderUids.map((uid) => fetchUser(uid)));
      setUsers(fetchedUsers.filter((user) => user !== null) as User[]);
    };

    fetchUsers();
  }, [chatMessages]);

  return (
    <div className={styles.chatRoomBox}>
      <div className={styles.chatDisplay}>
        {chatMessages.map((message) => {
          const sender = users.find((user) => user.uid === message.sender_uid);
          if (!sender) return null;
          return (
            <MessageItem
              key={message.id}
              message={message}
              isMyMessage={message.sender_uid === myUid}
              senderName={sender.name}
			  senderProfilePicture={sender.avatar}
            />
          );
        })}
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
