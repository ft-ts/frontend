
export interface UserProps{
    id: number;
    uid: number;
    name: string;
    avatar: string;
    email: string;
    twoFactorAuth: boolean;
    // status: "OFFLINE",
    hashedRt: string;
    qrSecret: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
}

export interface UserProfileProps{
    userProfilePicture: string; // type을 어떻게 할 지 미정
    nickname: string;
    online: boolean;
    gameState: boolean;
    winCount: number;
    loseCount: number;
    ladderPoint: number;
}

export interface UserListProps{
    userProfilePicture: string // type을 어떻게 할 지 미정
    nickName: string;
    gameState: boolean;
    online: boolean;
};
export interface gameStateProps{
    gameState: boolean;
    online: boolean;
}

export interface UserListContainerProps{
    users: UserListProps[];
}

export interface UserInfoContainer{
    user: UserProps;
}