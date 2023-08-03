import styles from "./left-wrapper.module.scss"

export default function LeftWrapper() {
  return (
    <div className={styles.leftWrapper}>
      <h1>LeftWrapper</h1>
      <CreateChannel />
      <ChannelPannel />
    </div>
  )
}

const CreateChannel = (props: {}) => {
    return (
        <button className={styles.createChannelBox}>
            <h2 className={styles.createChannelFont}>Create Channel</h2>
        </button>
    )
}

const ChannelPannel = (props: {}) => {
    return (
        <div className={styles.channelPannelBox}>
            <h2 className={styles.channelPannelFont}>Channels</h2>
        </div>
    )    
}
