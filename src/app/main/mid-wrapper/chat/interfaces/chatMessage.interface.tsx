import UserInterface from "@/app/axios/interfaces/user.interface";

interface ChatMessage {
  id: number;
  channel_id: number;
  isNotice: boolean;
  sender : UserInterface;
  content: string;
  timeStamp: Date;
} 

export default ChatMessage;