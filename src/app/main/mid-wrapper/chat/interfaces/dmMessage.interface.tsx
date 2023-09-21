import UserInterface from '@/app/axios/interfaces/user.interface';

interface DmMessage {
  id: number;
  sender: UserInterface;
  receiver: UserInterface;
  message: string;
  viewed: boolean;
  created_at: Date;
}

export default DmMessage;