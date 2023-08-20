import ChatMessage from "./chatMessage.interface";

interface MessageItemProps {
	message: ChatMessage;
	isMyMessage: boolean;
	senderName: string;
	senderProfilePicture: string;
  }

export default MessageItemProps;