import Styles from './right-wrapper.module.scss'
import UserList from './user-list/page'
import UserProfile from './user-profile/page'

export default function RightWrapper() {
    return (
        <div className={Styles.rightWrapper}>
            <UserProfile />
            <UserList />
        </div>
    )
}

// const DisplayUserProfile = (props: {}) => {
//     console.log("test");
//     return (
//         <div>
//             <DisplayUserProfileBackground />
//         </div>
//     )
// }

// const DisplayUserProfileBackground = (props: {}) => {
//     return (
//         <div className={styles.userProfileBackground}>
//             <DisplayUserProfileImage />
//             <DisplayUserProfileName nickname="DOHYULEE" />
//             <DisplayUserGameState gameState={true} online={false} />
//             <DisplayMatchNumber winCount={30} loseCount={30} />
//             <DisplayLadderPoint ladderPoint={1100} />
//             <DisplayEditButton />
//         </div>
//     )
// }

// const DisplayUserProfileImage = (props: {}) => {
//     return (
//         <Image src="/asset/profile_dumy.png" 
//         className={styles.userProfilePicture}
//         width={200}
//         height={162}
//         quality={100}
//          alt="userPicture"/>
//     )
// }

// const DisplayUserProfileName = (props: {nickname: string}) => {
//     return (
//         <div className={styles.userProfileName}>
//             <h2>{props.nickname}</h2>
//         </div>
//     )
// }


// const DisplayUserGameState = (props: gameStateProps) => {
//     const [status, setStatus] = useState("");
//     const [style, setStyle] = useState(""); // Initialize as a string

//     useEffect(() => {
//         if (props.online){
//             console.log(props.online);
//             if (props.gameState){
//                 setStatus("In-Game");
//                 setStyle(styles.GameState);
//             } else {
//                 setStatus("online");
//                 setStyle(styles.onlineState);
//             }
//         } else {
//             setStatus("offline");
//             setStyle(styles.offlineState);
//         }
//     }, [props.gameState, props.online]);

//     return (
//         <div className={style}>
//             <h3>{status}</h3>
//         </div>
//     );
//   }
  

// const DisplayMatchNumber = (props: {winCount: number, loseCount: number}) => {
//     return (
//         <div className={styles.userCount}>
//             <h3 style={{ marginTop: '0px'}}>Win: {props.winCount}</h3>
//             <h3 style={{ marginTop: '30px'}}>Lose: {props.loseCount}</h3>
//         </div>
//     )
// }

// const DisplayLadderPoint = (props: {ladderPoint: number}) => {
//     return (
//         <div className={styles.ladderPoint}>
//             <h3>Ladder: {props.ladderPoint}</h3>
//         </div>
//     )
// }

// const DisplayEditButton = (props: {}) => {
//     return (
//         <button className={styles.editButtonRectangle}>
//             <h3 className={styles.editButtonFont}>edit my profile</h3>
//         </button>
//     );
// }

// export { DisplayUserGameState }
