
interface UserInterface {
		uid: number;
		name: string;
		avatar: string | null;
        twoFactorAuth: boolean;
  }

export default UserInterface;