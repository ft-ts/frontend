import React, { useState, useEffect } from 'react';
import styles from "./editForm.module.scss"
import EditProfileProps from './editFormProps';
import PreviewProps from './editAvatarProps'
import { useGlobalContext } from '@/app/Context/store';
import { getMyInfo } from '@/app/axios/client';
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
    const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null);
    const [ newNickname, setNewNickname ] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    
    const handleEditNewProfile = () => {
        // Some validation
        if(!newNickname || newNickname.length > 15) {
                setErrorMessage("Invalid new name");
            return;
        }
        
        // socket.emit('user/editProfile', {
        //     uid: myInfo.uid,
        //     nickname: newNickname,
        //     avatar: uploadedAvatar
        // });
        props.onClose();
    }
    

    return (
        <div className={styles.EditFormContainer}>
            <Image
                className={styles.avatar}
                src={uploadedAvatar || myInfo.avatar}
                alt="My Image"
                width={400}
                height={400}
            ></Image>
            <Preview setUploadedAvatar={setUploadedAvatar} />
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

const Preview = (props: { setUploadedAvatar: (avatar: string | null) => void }) => {
    const [imageSrc, setImageSrc]: any = useState(null);

    const onUpload = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise<void>((resolve) => { 
            reader.onload = () => {	
                setImageSrc(reader.result || null); // 파일의 컨텐츠
                props.setUploadedAvatar(reader.result as string);
                resolve();
            };
        });
    }
    return (
        <>
            <label htmlFor="fileInput" className={styles.customFileUpload}>
                Change new Avatar
            </label>
            <input 
                id="fileInput"
                className="hidden"
                accept="image/*" 
                multiple 
                type="file"
                onChange={e => onUpload(e)}
            />
        </>

    )
}

export { EditForm };