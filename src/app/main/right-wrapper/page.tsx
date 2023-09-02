import Styles from './right-wrapper.module.scss'
import UserList from './user-list/page'
import UserProfile from './user-profile/page'

export default function RightWrapper({ channelId }: { channelId: number | null }) {

    return (
        <div className={Styles.rightWrapper}>
            <UserProfile />
            <UserList channelId={channelId}/>
        </div>
    )
}