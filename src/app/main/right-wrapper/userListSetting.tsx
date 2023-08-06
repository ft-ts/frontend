import React from "react";
import styles from "./userListSetting.module.scss"
import Image from "next/image";

const DisplayUserlistSetting = (props: {}) => {

    console.log("did it well?");
    return (
        <div className={styles.userListSettingBackground}>
            <BackToUserList />
        </div>
    )
}

const BackToUserList = (props: {}) => {
    return (
        <button>
        <Image src="/asset/back_door.svg"
            className={styles.backdoorButton} 
            alt="뒤로가기"
            width={52}
            height={52} />
        </button>
    )
}

export default DisplayUserlistSetting;
export {};