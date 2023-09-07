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

  const handleInviteMatch = () => {
    console.log('Invite Match', user);
  }

  return (
    <div ref={menuDiv} className={Styles.userMenu}>
      <div className={Styles.name}>{user.name}</div>
      <div className={Styles.list}>
        <button>Profile</button>
        <button>friend</button>
        <button onClick={handleInviteMatch}>Match</button>
        <button>Invite Chat Room</button>
        <button onClick={sendDM}>DM</button>
        <button>Block</button>
      </div>
    </div>
  )
}