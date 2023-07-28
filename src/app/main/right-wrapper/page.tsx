import './right-wrapper.css'
import styles from './user-profile.module.css'
import Image from "next/image"

export default function RightWrapper() {
  return (
    <div id="right-wrapper">
      <h1>RightWrapper</h1>
      <UserProfileBackground />
    </div>
  )
}

const UserProfileBackground = (props: {}) => {
    return (
        <div className={styles.userProfileBackground}>
            <h1>hihi</h1>
            <Image src="/asset/profile_dumy.png" 
            className={styles.userProfilePicture}
            width={200}
            height={162}
            quality={100}
             alt="userPicture"/>
        </div>
    )
}