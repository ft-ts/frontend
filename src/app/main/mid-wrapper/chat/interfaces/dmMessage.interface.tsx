import UserInterface from '@/app/axios/interfaces/user.interface';

enum DmStatus {
	PENDING = 'PENDING',
	ACCEPTED = 'ACCEPTED',
	REJECTED = 'REJECTED',
	CANCELED = 'CANCELED',
	SENT = 'SENT',
  }

  enum DmType {
	DM = 'DM',
	FRIEND = 'FRIEND',
	MATCH = 'MATCH'
  }

interface DmMessage {
	id: number;
	sender: UserInterface;
	receiver: UserInterface;
	message: string;
	type: DmType;
	status: DmStatus;
	viewed: boolean;
	createdAt: Date;
  }
  
  export default DmMessage;
  