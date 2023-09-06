import { use, useEffect, useRef } from 'react';
import Styles from './UserMenu.module.scss';

export const UserMenu = ({ user, setMenuOn }: { user: { name: String, uid: Number }, setMenuOn: any }) => {
  const menuDiv = useRef<HTMLDivElement>(null);
  const sendDM = () => {
    setMenuOn(false);
  }

  useEffect(() => {
    menuDiv.current?.addEventListener('mouseleave', () => {
      setMenuOn(false);
    });
  }, []);

  return (
    <div ref={menuDiv} className={Styles.userMenu}>
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