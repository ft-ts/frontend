interface ChatMessage {
  id: number;
  channel_id: number;
  isNotice: boolean;
  sender_uid: number | null;
  content: string;
  timeStamp: Date;
} 

export default ChatMessage;