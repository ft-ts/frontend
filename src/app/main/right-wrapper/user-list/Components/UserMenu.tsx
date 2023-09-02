import Styles from './UserMenu.module.scss';

export const UserMenu = ({ user, setMenuOn }: { user: { name: String, uid: Number }, setMenuOn: any }) => {
  const sendDM = () => {
    console.log("DM");
    setMenuOn(false);
  }

  return (
    <div className={Styles.userMenu}>
      <div className={Styles.name}>{user.name}</div>
      <div className={Styles.list}>
        <button>프로필보기</button>
        <button>친구 추가</button>
        <button>초대하기</button>
        <button>매치 신청</button>
        <button onClick={sendDM}>DM 보내기</button>
        <button>차단</button>
      </div>
    </div>
  )
}