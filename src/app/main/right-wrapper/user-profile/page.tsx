import Styles from './user-profile.module.scss'
import Image from "next/image";

interface User {
  uid: number,
  name: string,
  avatar: string,
  email: string,
  twoFactorAuth: boolean,
  status: string,
  rating: number,
  custom_wins: number,
  custom_losses: number,
  ladder_wins: number,
  ladder_losses: number,
}

enum UserStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  INGAME = 'IN-GAME',
}

export default async function UserProfile() {
  const userInfo: User = await fetchData();

  return (
    <div className={Styles.userProfile}>
      <div className={Styles.userInfoWrapper}>
        <Image
          className={Styles.avatar}
          src={userInfo.avatar} // 이미지 파일의 경로
          alt="My Image"
          width={200} // 이미지 가로 크기
          height={200} // 이미지 세로 크기
        />
        <div className={`${Styles.status} ${getStatusColor(userInfo.status as UserStatus)}`}>{userInfo.status}</div>
        <div className={Styles.username}>{userInfo.name}</div>
        <div className={Styles.stats}>
          <ul>
            <li><span>WIN: {userInfo.ladder_wins}</span></li>
            <li><span>LOSE: {userInfo.ladder_losses}</span></li>
            <li><span>LADDER: {userInfo.rating}</span></li>
          </ul>
        </div>
      </div>
      <button className={Styles.editButton}>EDIT MY INFO</button>
    </div>
  )
}

async function fetchData(): Promise<User> {
  const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjk4MjY3LCJlbWFpbCI6ImRvaHl1bGVlQHN0dWRlbnQuNDJzZW91bC5rciIsInR3b0ZhY3RvckF1dGgiOmZhbHNlLCJpYXQiOjE2OTE0NzEyMjAsImV4cCI6MTY5MTUxNDQyMH0.gjyGdXSBnuH99ZhtNzfc_nOfuzKVkKQtiTr4XWB8szQ';
  const response = await fetch("http://localhost:10000/api/users", {
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + accessToken,
    },
    cache: "no-cache",
    // next: {
    //   revalidate : 10, // 10초마다 요청
    // }
  });
  const data: User = await response.json();
  return data;
}

function getStatusColor(status: UserStatus) {
  switch (status) {
    case UserStatus.ONLINE:
      return Styles.online;
    case UserStatus.OFFLINE:
      return Styles.offline;
    case UserStatus.INGAME:
      return Styles.inGame;
  }
}
