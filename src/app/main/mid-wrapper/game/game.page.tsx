"use-client";

import React, { useState, useEffect } from "react";
import styles from "./gameItem.module.scss";
import SearchBox from './game.search'
import GameHistory from './game.history'
import MatchButton from './game.match'
import Game from './game'
import { historyInterface } from "./game.interface";
import { socket } from "../../components/CheckAuth";

export default function GamePage() {
  const [matchFlag, setMatchFlag] = useState(false);
  const [gameFlag, setGameFlag] = useState(false);
  const [searchFlag, setSearchFlag] = useState(false);
  const [gameHistory, setGameHistory] = useState<historyInterface>({history : []});
  const [matchID, setMatchID] = useState<string>('');

  useEffect(() => {
    socket.on('pong/game/init', ( data : { matchID: string }) =>
    {
      console.log('main game init', data);
      setGameFlag(true);
      setMatchID(data.matchID);
    });
  }, [matchFlag, gameFlag, searchFlag]);

  return (
    <div>
      <div className={styles.gameBackground}>
        <div>
          {
            !matchFlag && <div className={styles.gameHistoryBackground}>
              <SearchBox setSearchFlag={setSearchFlag} setGameHistory={setGameHistory} />
              {searchFlag && <GameHistory data={gameHistory} />}
            </div>
          }
        </div>
        <div>
          {gameFlag && <Game setMatchFlag={setMatchFlag} setGameFlag={setGameFlag} setMatchID={setMatchID} matchID={matchID}/>}
        </div>
        <div className={styles.blinking}>
          {(matchFlag && !gameFlag) && <h2 className={styles.matchingFont}>matching...</h2>}
        </div>
      </div>
      <div>
        {!gameFlag && <MatchButton setMatchFlag={setMatchFlag} setGameHistory={setGameHistory} matchFlag={matchFlag}/>}
      </div>
    </div>
  )
}