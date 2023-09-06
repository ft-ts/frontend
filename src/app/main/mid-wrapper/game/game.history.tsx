"use-client";

import styles from './gameItem.module.scss';
import { formatTime } from './game.utils'
import { historyInterface } from './game.interface'

export default function GameHistory({data} : {data:historyInterface}) {
  return (
    <ul>
      {data.history.map((match : any) => (
        <li key = {match.id}>
          <div className={styles.historyContainer}>
            <div className={styles.matchTypeBox}>
              <h2 className = {styles.historyFont}>{match.match_type}</h2>
            </div>
            <div className={styles.historyLeftBox}>
              <h2 className = {styles.historyFont}>{match.home}</h2>
            </div>
            <div className={styles.historyCenterBox}>
              <h2 className={styles.historyFont}>
                {match.home_score}
                {' '}
                :
                {' '}
                {match.away_score}
              </h2>
            </div>
            <div className={styles.historyRightBox}>
              <h2 className = {styles.historyFont}>{match.away}</h2>
            </div>
          </div>
          <h2 className={styles.matchTimeFont}>{formatTime(match.start_date)}</h2>

        </li>
      ))}
    </ul>
  )
}
