import { ChannelRole } from '../enum/channelRole.enum';
import { User } from '../../../interface/User.interface';

export interface ChannelUser {
  id: number;
  joined_at: Date;
  role: ChannelRole;
  user: User;
}