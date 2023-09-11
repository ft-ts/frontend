interface ChatMessage {
	id: number;
	sender_uid: number | null;
	content: string;
	timeStamp: Date;
} 

export default ChatMessage;