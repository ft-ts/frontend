import React, { useState, useEffect } from 'react';
import styles from "./editForm.module.scss"
import PreviewProps from './editAvatarProps'
import { useGlobalContext } from '@/app/Context/store';
import UserInterface from '@/app/axios/interfaces/user.interface';
import Image from 'next/image';

interface EditProfileProps {
  onClose: () => void;
}

export const EditForm = (props: EditProfileProps) => {
  const { myInfo, setMyInfo }: any = useGlobalContext();

  // useEffect(() => {
  //     getMyInfo().then((res) => {
  //     setMyInfo(res.data);
  //     });
  // }, []);

  useEffect(() => {
  }, [myInfo]);

  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null);
  const [newNickname, setNewNickname] = useState('');


  const handleEditNewProfile = async (e: any) => {

    if (newNickname) {
      e.preventDefault();
      const userData: Partial<UserInterface> = {
        name: newNickname
      };
      console.log(`User😘`, userData);
      // await updateUser(userData).then((res: any) => {
      //     setMyInfo(res.data);
      //     console.log("after update", res.data);
      // })
    }
    props.onClose();
  }


  return (
    <div className={styles.EditFormContainer}>
      <Image
        src={uploadedAvatar || myInfo.avatar}
        alt="My Image"
        className={styles.avatar}
        width={200}
        height={200}
      ></Image>
      <Preview setUploadedAvatar={setUploadedAvatar} funMyInfo={setMyInfo} />
      <TwoFactorAuthButton twoFactorAuthMode={myInfo.twoFactorAuth} funMyInfo={setMyInfo} />
      <h2 className={styles.h2}>Chagne new NickName</h2>
      <input
        type="text"
        placeholder='NickName'
        value={newNickname}
        onChange={(e) => setNewNickname(e.target.value)}
        className={styles.input}
      ></input>
      <div className={styles.ComponentWrapper}>
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleEditNewProfile} className={styles.buttonEdit}>Edit</button>
        <button onClick={props.onClose} className={styles.buttonCancel}>Cancel</button>
      </div>
    </div>
  )
}

const Preview = (props: PreviewProps) => {
  const [imageSrc, setImageSrc]: any = useState<string | null>(null);
  const [isNewAvatar, setIsNewAvatar] = useState<boolean>(false);

  const onUpload = async (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const loadedImageSrc = reader.result as string;
      setImageSrc(loadedImageSrc);
      props.setUploadedAvatar(loadedImageSrc);
      setIsNewAvatar(true);
    };

    reader.readAsDataURL(file);

    // If the logic below isn't necessary, you can remove the promise altogether
    return new Promise<void>((resolve) => {
      reader.onloadend = () => resolve();
    });
  }

  const UploadNewAvatar = async () => {
    if (isNewAvatar && imageSrc) { // Check if it's a new avatar and if imageSrc is set
      const userData: Partial<UserInterface> = {
        avatar: imageSrc
      };
      // await updateUser(userData).then((res: any) => {
      //     console.log("data", res.data);
      //     props.funMyInfo(res.data);
      // });
      setIsNewAvatar(false); // Reset the flag after updating the avatar
    }
  }

  useEffect(() => {
    if (isNewAvatar) {
      console.log("data", imageSrc.size);
      UploadNewAvatar();
    }
  }, [isNewAvatar]); // Runs every time `isNewAvatar` changes

  return (
    <>
      <label htmlFor="fileInput" className={styles.customFileUpload}>
        Change new Avatar
      </label>
      <input
        id="fileInput"
        className="hidden"
        accept="image/*"
        type="file"
        onChange={onUpload}
      />
    </>
  );
}


type FaModeButtonProps = {
  twoFactorAuthMode: boolean;
  funMyInfo: (newState: boolean) => void;
};

const TwoFactorAuthButton = (props: FaModeButtonProps) => {
  const { myInfo, setMyInfo }: any = useGlobalContext();

  const [isFAon, setIstFaon] = useState(props.twoFactorAuthMode);

  useEffect(() => {
    async function updateUserData() {
      const userData: Partial<UserInterface> = {
        // twoFactorAuth: isFAon
      };
      // const res = await updateUser(userData);
      // props.funMyInfo(res.data);
    }

    updateUserData();

  }, [isFAon]);

  const handdleButton = (e: any) => {
    e.preventDefault();
    setIstFaon(prevState => !prevState); // Use function form for state update
  }

  return (
    <button onClick={handdleButton} className={styles.faModeButton}>
      {isFAon ? 'TwoFactorAuth On' : 'TwoFactorAuth Off'}
    </button>
  )
}

