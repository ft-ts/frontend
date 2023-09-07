import React, { useState, useEffect } from 'react';
import styles from "./editForm.module.scss"
import EditProfileProps from './editFormProps';
import { useGlobalContext } from '@/app/Context/store';
import { getMyInfo } from '@/app/api/client';
import Image from 'next/image';
import { socket } from '../../components/CheckAuth';

const EditForm = (props: EditProfileProps) => {
    const { myInfo, setMyInfo }: any = useGlobalContext();

    useEffect(() => {
        getMyInfo().then((res) => {
        setMyInfo(res.data);
        });
    }, []);

    useEffect(() => {
    }, [myInfo]);

    const [ newNickname, setNewNickname ] = useState('');
    const [ newAvatar, setNewAvatar ] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEditNewProfile = () => {
        if (!newNickname) {
            setErrorMessage('Please fill out the new nickname');
            return ;
        }
        if (!newAvatar) {
            setErrorMessage('Please fill out the vaild new avatar url');
            setNewAvatar(myInfo.avatar);
            return ;
        }
        socket.emit('userProfile/update', {
            newNickname,
            newAvatar
        });
        props.onClose();
    }

    const isValidImageUrl = (url: string, timeout: number = 5000): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            const image = new window.Image();
            let timer: number | NodeJS.Timeout;

        
            image.onload = function() {
            clearTimeout(timer);
            resolve(true);
            };
        
            image.onerror = function() {
            clearTimeout(timer);
            reject(new Error("Invalid image URL"));
            };
        
            timer = setTimeout(() => {
            image.src = ''; // This will cancel the loading if it's in progress
            reject(new Error("Timeout while checking image URL"));
            }, timeout);
        
            image.src = url;
        });
      };
      
      isValidImageUrl(myInfo.avatar)
    .then((isValid) => {
        console.log(isValid ? "Image is valid!" : "Image is not valid.");
    })
    .catch((error) => {
        console.log(`Validation failed due to: ${error.message}`);

    });

      

    return (
        <div className={styles.EditFormContainer}>
            <Image
                className={styles.avatar}
                src={myInfo.avatar}
                alt="My Image"
                width={400}
                height={400}
            ></Image>
            <h2 className={styles.h2}>Change new Avatar</h2>
            <input
                type="text"
                placeholder='Avatar'
                value={newAvatar}
                onChange={(e) => setNewAvatar(e.target.value)}
                className={styles.input}
                ></input>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <h2 className={styles.h2}>Chagne new NickName</h2>
            <input
                type="text"
                placeholder='NickName'
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                className={styles.input}
                ></input>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
             <div className={styles.buttonContainer}>
                <button onClick={handleEditNewProfile} className={styles.buttonEdit}>Edit</button>
                <button onClick={props.onClose} className={styles.buttonCancel}>Cancel</button>
             </div>
        </div>
    )
}

export { EditForm };