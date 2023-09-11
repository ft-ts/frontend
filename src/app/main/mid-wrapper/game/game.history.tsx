"use-client";

import styles from './gameItem.module.scss';
import { formatTime } from './game.utils'
import { historyInterface, historyDto } from './game.interface'

export default function GameHistory({data} : {data:historyInterface}) {
  return (
    <div className={styles.historyContainer} >
      {data.history.map((match : historyDto) => (
        <ol key = {match.id}>
          <div className={styles.historyBox}>
            <div className={`${styles.matchTypeBox} ${styles[`matchType-${match.match_type}`]}`}>
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

        </ol>
      ))}
    </div>
  )
}
