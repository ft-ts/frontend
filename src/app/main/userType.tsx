
export interface UserProfileProps{
    userProfilePicture: string; // type을 어떻게 할 지 미정
    nickname: string;
    gameState: boolean;
    winCount: number;
    loseCount: number;
    ladderPoint: number;
}

export interface UserListProps{
    nickName: string;
};