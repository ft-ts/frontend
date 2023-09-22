import React, { useState, useEffect } from 'react';
import styles from "./editForm.module.scss"
import { useGlobalContext } from '@/app/Context/store';
import { User } from '../../interface/User.interface';
import { apiClient } from '@/app/axios/client';

interface EditProfileProps {
  onClose: () => void;
}

export const EditForm = (props: EditProfileProps) => {
  const { myInfo, setMyInfo }: any = useGlobalContext();
  const avatarRef = React.useRef<HTMLLabelElement>(null);
  const TFABtn = React.useRef<HTMLButtonElement>(null);

  const [avatar, setAvatar] = useState<string>(myInfo.avatar);
  const [name, setname] = useState<string>(myInfo.name);
  const [TFA, setTFA] = useState<boolean>(myInfo.twoFactorAuth);

  useEffect(() => {
    if (avatar && avatarRef.current)
      avatar ? avatarRef.current.style.backgroundImage = `url(${avatar})` : null;
    
    if (TFA && TFABtn.current)
      TFABtn.current.classList.add(styles.TFAButtonOn);
    else if (!TFA && TFABtn.current)
      TFABtn.current.classList.remove(styles.TFAButtonOn);

  }, [avatar, name, TFA]);

  const handleAvatar = () => {
    const file = document.getElementById("avatar-upload") as HTMLInputElement;
    if (file.files && file.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target?.result) {
          if (e.target?.result.toString().length > 150000) {
            alert("이미지 크기는 150kb 이하로 선택해주세요.");
            return;
          }
          setAvatar(e.target?.result.toString());
        }
      }
      reader.readAsDataURL(file.files[0]);
    }
  }

  const handleFTA = () => {
    setTFA(!TFA);
  }

  const handleUpdate = () => {
    const user: Partial<User> = {
      name: name,
      avatar: avatar,
      twoFactorAuth: TFA,
    }
    apiClient.patch(`/users`, user).then((res) => {
      setMyInfo(res.data);
      props.onClose();
    });
  }

  return (
    <div className={styles.EditFormContainer}>
      <input id="avatar-upload" type="file" accept="image/png, image/jpeg" onChange={handleAvatar} className={styles.avatar} />
      <label htmlFor="avatar-upload" ref={avatarRef} className={styles.avatarLabel}></label>
      <button onClick={handleFTA} ref={TFABtn} className={styles.TFAButton}> {TFA ? 'TwoFactorAuth On' : 'TwoFactorAuth Off'}</button>
      <input
        type="text"
        placeholder='NickName'
        value={name}
        onChange={(e) => setname(e.target.value)}
        className={styles.input}
      ></input>
      <div className={styles.ComponentWrapper}>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleUpdate} className={styles.buttonEdit}>Edit</button>
        <button onClick={props.onClose} className={styles.buttonCancel}>Cancel</button>
      </div>
    </div>
  )
}
