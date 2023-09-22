'use client';

import React, { useState, useEffect, useRef   } from 'react';
import styles from './chat-wrapper.module.scss';
import MessageItem from './messageItem';
import ChatMessage from './interfaces/chatMessage.interface';
import { socket } from '../../components/CheckAuth';
import { useGlobalContext } from '@/app/Context/store';
import DmMessage from './interfaces/dmMessage.interface';
import DmMessageItem from './dmMessageItem';
import { getDirectMessages, getChannelMessages, postDmRead, getDmLists } from '@/app/axios/client';

export default function ChatRoom() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [dmMessages, setDmMessages] = useState<DmMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  
  const { currentChannelId }: any = useGlobalContext();
  const { currentDmId }: any = useGlobalContext();
  const { setDmList }: any = useGlobalContext();
  
  const scrollToBottom = (length : number) => {
    setTimeout(function() {
      if (messageEndRef.current) {
        messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
      }
    }, length * 5);
  };
  
  useEffect(() => {
    if (chatMessages.length === 0 && dmMessages.length === 0) return ;
    const length = chatMessages.length + dmMessages.length;
    scrollToBottom(length);
  }, [chatMessages, dmMessages]);

  useEffect(() => {
    setChatMessages([]);
    setDmMessages([]);
    if (currentChannelId){
      getChannelMessages(currentChannelId).then((res) => {
        const { data } = res;
        setChatMessages(data);
      }).catch((err) => {
        console.log('getCM', err);
      });
    }
  }, [currentChannelId]);

  useEffect(()=> {
    setChatMessages([]);
    setDmMessages([]);
    if (currentDmId){
      getDirectMessages(currentDmId).then((res) => {
        const { data } = res;
        setDmMessages(data);
      }).catch((err) => {
        console.log('getDM', err)
      });
    }
  }, [currentDmId]);

  useEffect(() => {
    socket.on('channel/sendMessage', (message: ChatMessage) => {
      // console.log('channel/sendMessage', message);
      if (currentChannelId === message.channel_id){
        setChatMessages((prevMessages) => [...prevMessages, message]);
      }
    });
    return () => {
      socket.off('channel/sendMessage');
    };
  }, [currentChannelId]);

  useEffect(() => {
    socket.on('dm/msg', async (message: DmMessage) => {
      // console.log('dm/msg',currentDmId ,message);
      if (currentDmId === message.receiver.uid || currentDmId === message.sender.uid) {
        setDmMessages((prevMessages) => [...prevMessages, message]);
        document.body.scrollTop = document.body.scrollHeight;
        await postDmRead(currentDmId).catch((err) => {
          console.log('postDmRead error : ', err);
        });
      }
      getDmLists().then((res) => {
        setDmList(res.data);
      }).catch((err) => {
        console.log('getDmLists error : ', err);
      });
    });
    return () => {
      socket.off('dm/msg');
    };
  }, [currentDmId]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') {
      return;
    }
    if (currentChannelId) {
      socket.emit('channel/sendMessage', {
        channelId: currentChannelId,
        content: inputMessage,
      });
    } else if (currentDmId) {
      socket.emit('dm/msg', {
        targetUid: currentDmId,
        message: inputMessage,
      });
    }
    setInputMessage('');
  };

  return (
    <div className={styles.chatRoomBox}>
      <div className={styles.chatDisplay} ref={messageEndRef}>
        {currentChannelId &&
          chatMessages?.map &&
          chatMessages.map((chatMessages) => (
            <MessageItem
             key={chatMessages.id}
             chatMessage={chatMessages} />
          ))}
        {currentDmId &&
          dmMessages?.map &&
          dmMessages.map((dmMessages) => (
            <DmMessageItem
              key={dmMessages.id}
              dmMessage={dmMessages} />
          ))}
      </div>
      {(currentChannelId || currentDmId) && (
        <span className={styles.spanSendMessage}>
          <input
            className={styles.inputMessageBox}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // Prevent default behavior (form submission)
                handleSendMessage();
              }
            }}
          ></input>
          <button className={styles.messageSendBox} onClick={handleSendMessage}>
            SEND
          </button>
        </div>
      )}
    </div>
  );
}
