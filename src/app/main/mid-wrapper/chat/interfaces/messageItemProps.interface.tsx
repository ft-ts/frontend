import UserInterface from "@/app/axios/interfaces/user.interface";
import { ChannelRole } from "../enum/channelRole.enum";


interface ChannelUserInterface {
	user: UserInterface;
	role: ChannelRole;
  }

export default ChannelUserInterface;