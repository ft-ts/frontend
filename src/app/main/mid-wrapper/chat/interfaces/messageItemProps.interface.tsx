import UserInterface from "@/app/api/interfaces/user.interface";
import { ChannelRole } from "../enum/channelRole.enum";


interface ChannelUserInterface {
	user: UserInterface;
	role: ChannelRole;
  }

export default ChannelUserInterface;