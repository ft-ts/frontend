import styles from "./left-wrapper.module.scss"

export default function LeftWrapper() {
  return (
    <div className={styles.leftWrapper}>
      <h1>LeftWrapper</h1>
      <CreateChannel />
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
