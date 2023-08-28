interface ChatMessage {
	id: number;
	sender_uid: number;
	content: string;
	timeStamp: Date;
} 

export default ChatMessage;