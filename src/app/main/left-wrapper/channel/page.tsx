import styles from "./channel.module.scss"

export default function Channel() {
  return (
    <div className={styles.leftWrapper}>
      <CreateChannel />
      <ChannelPannel />
      <SelectChannelAll />
      <SelectChannelMy />
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

const SelectChannelAll = (props: {}) => {
    return (
        <button className={styles.selectAllPannelBox}>
            <h2 className={styles.selectAllPannelFont}>ALL</h2>
        </button>
    )
}

const SelectChannelMy = (props: {}) => {
    return (
        <button className={styles.selectMyPannelBox}>
            <h2 className={styles.selectMyPannelFont}>My</h2>
        </button>
    )
}