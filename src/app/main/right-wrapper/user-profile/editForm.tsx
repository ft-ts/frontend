import React, { useState, useEffect, ChangeEvent } from 'react';
import styles from "./editForm.module.scss"
import { useGlobalContext } from '@/app/Context/store';
import { User } from '../../interface/User.interface';
import { apiClient } from '@/app/axios/client';
import { ValueInterface, useRightWrapperContext } from '../Context/rightWrapper.store';
import { useRouter } from 'next/navigation';
import { socket } from '../../components/CheckAuth';
import { set } from 'react-hook-form';

interface EditProfileProps {
  onClose: () => void;
}

export const EditForm = (props: EditProfileProps) => {
  const router = useRouter();
  const { myInfo, setMyInfo }: any = useGlobalContext();
  const { userInfoFlag, setUserInfoFlag }: any = useGlobalContext();
  const { isNotificationVisible, setIsNotificationVisible }: any = useGlobalContext();
  const { errorMessage, setErrorMessage }: any = useGlobalContext();
  const { userList }: Partial<ValueInterface> = useRightWrapperContext();
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

  const handleAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const eventFiles = event.target.files;

    if (!eventFiles || eventFiles.length === 0)
      return;

    uploadImage(eventFiles[0]);
  }

  const uploadImage = (file: File) => {

    if (file.size > 200000){
      setErrorMessage('200KB 이하의 이미지만 업로드 가능합니다.');
      setIsNotificationVisible(true);
      setTimeout(() => {
        setErrorMessage('');
        setIsNotificationVisible(false);
      }, 2000);
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      if (reader.readyState !== 2)
        return;
      if (typeof e.target?.result === "string") {

        const userData = {
          avatar: e.target?.result,
        }

        const accessToken = document.cookie?.split('; ')?.find(item => item.startsWith('accessToken'))?.split('=')[1];
        if (!accessToken) {
          router.push("/login");
        }

        apiClient.patch(`/users`, userData, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
          },
        }).then((res) => {
          if (res.status === 200 && res.data?.avatar) {
            setMyInfo(res.data);
            setUserInfoFlag(!userInfoFlag);
            socket.emit('update/userInfo');
            alert("이미지 업로드에 성공했습니다.. ");
            props.onClose();
          }
          else{
            setErrorMessage('이미지 업로드에 실패했습니다.. ');
            setIsNotificationVisible(true);
            setTimeout(() => {
              setErrorMessage('');
              setIsNotificationVisible(false);
            }, 2000);
          }
        });
        setAvatar(e.target.result);
      }
      else
        new Error("FileReader error");
    }

    reader.onerror = (e) => {
      new Error("FileReader error");
    };

    reader.readAsDataURL(file);
  }

  const handleFTA = () => {
    setTFA(!TFA);
  }

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "");
    if (e.target.value.length > 10)
      return;
    setname(e.target.value);
  }

  const handleUpdate = async () => {
    //
    if (name === myInfo.name) {
      setErrorMessage('닉네임이 변경되지 않았습니다.');
      setIsNotificationVisible(true);
      setTimeout(() => {
        setErrorMessage('');
        setIsNotificationVisible(false);
      }, 2000);
      return;
    }
    if (name.length < 3) {
      setErrorMessage('닉네임은 3글자 이상이어야 합니다.');
      setIsNotificationVisible(true);
      setTimeout(() => {
        setErrorMessage('');
        setIsNotificationVisible(false);
      }, 2000);
      return;
    }
    const isExist = userList?.find((user: User) => user.name === name);
    if (isExist) {
      setErrorMessage('이미 존재하는 닉네임입니다.');
      setIsNotificationVisible(true);
      setTimeout(() => {
        setErrorMessage('');
        setIsNotificationVisible(false);
      }, 2000);
      return;
    }
    const userData: Partial<User> = {
      twoFactorAuth: TFA,
    };
    if (name !== myInfo.name)
      userData.name = name;

    console.log("🤬 userData: ", userData);
    
    await apiClient.patch(`/users`, userData).then((res) => {
      if (res.status === 200){
        setMyInfo(res.data);
        setUserInfoFlag(!userInfoFlag);
        socket.emit('update/userInfo');
      }
    });
    props.onClose();
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
        onChange={handleName}
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
