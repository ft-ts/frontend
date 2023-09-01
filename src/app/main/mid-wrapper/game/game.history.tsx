"use-client";

import styles from './gameItem.module.scss';
import { formatTime } from './game.utils'
import { historyInterface } from './game.interface'

export default function GameHistory({data} : {data:historyInterface}) {
  return (
    <ul>
      {data.history.map((match : any) => (
        <li key = {match.matchInfo_id}>
          <div className={styles.historyContainer}>
            <div className={styles.matchTypeBox}>
              <h2 className = {styles.historyFont}>{match.matchInfo_match_type}</h2>
            </div>
            <div className={styles.historyLeftBox}>
              <h2 className = {styles.historyFont}>{match.matchInfo_winner_id}</h2>
            </div>
            <div className={styles.historyCenterBox}>
              <h2 className={styles.historyFont}>
                {match.matchInfo_winner_score}
                {' '}
                :
                {' '}
                {match.matchInfo_loser_score}
              </h2>
            </div>
            <div className={styles.historyRightBox}>
              <h2 className = {styles.historyFont}>{match.matchInfo_loser_id}</h2>
            </div>
          </div>
          <h2 className={styles.matchTimeFont}>{formatTime(match.matchInfo_timestamp)}</h2>

        </li>
      ))}
    </ul>
  )
}
