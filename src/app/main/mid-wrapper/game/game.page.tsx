"use-client";

import React, { useState, useEffect, use } from "react";
import styles from "./gameItem.module.scss";
import SearchBox from './game.search'
import GameHistory from './game.history'
import MatchButton from './game.match'
import Game from './game'
import { historyInterface, userInterface } from "./game.interface";
import { socket } from "../../components/CheckAuth";
import GameFriend from "./game.friend";
import { User } from '@/app/main/interface/User.interface';


export default function GamePage() {
  const [matchFlag, setMatchFlag] = useState(false);
  const [gameFlag, setGameFlag] = useState(false);
  const [searchFlag, setSearchFlag] = useState(false);
  const [inviteFlag, setInviteFlag] = useState<boolean>(false);
  const [gameHistory, setGameHistory] = useState<historyInterface>({history : []});
  const [matchID, setMatchID] = useState<string>('');
  const [isHome, setIsHome] = useState<boolean>(false);
  const [opponent, setOpponent] = useState<userInterface>({uid: 0, name: '', avatar: ''});

  useEffect(() => {
    socket.on('pong/init', ( data: any) =>
    {
      setMatchFlag(false);
      setSearchFlag(false);
      setGameFlag(false);
      setInviteFlag(false);
      setGameHistory({history : []});
      setMatchID('');
      setIsHome(false);
      setOpponent({uid: 0, name: '', avatar: ''});
    });
  },[inviteFlag, gameFlag, matchFlag, searchFlag]);

  useEffect(() => {
    socket.on('pong/game/init', ( data : { matchID: string, isHome: boolean }) =>
    {
      setInviteFlag(false);
      setGameFlag(true);
      setMatchID(data.matchID);
      setIsHome(data.isHome);
    });
  }, [gameFlag, isHome]);

  useEffect(() => {
    socket.on('pong/match/invite/wating', ( data : { user: User }) =>
    {
      socket.emit('pong/ladder/cancle');
      setSearchFlag(false);
      setGameHistory({history : []});
      setInviteFlag(true);
      setIsHome(true);
      setOpponent({uid: data.user.uid, name: data.user.name, avatar: data.user.avatar});
    });

    socket.on('pong/match/invite', ( data : { user: User }) =>
    {
      setMatchFlag(false);
      setSearchFlag(false);
      setGameHistory({history : []});
      setInviteFlag(true);
      setIsHome(false);
      setOpponent({uid: data.user.uid, name: data.user.name, avatar: data.user.avatar});
    });


    socket.on('pong/match/invite/cancle', ( data : { uid: number }) =>
    {
      socket.emit('pong/init');
    });

    }, [inviteFlag]);

  useEffect(() => {

  }, [matchFlag, searchFlag]);

  return (
    <div>
      <div className={styles.gameBackground}>
        <div>
          {
            (!matchFlag && !inviteFlag && !gameFlag) && <div className={styles.gameHistoryBackground}>
              <SearchBox setSearchFlag={setSearchFlag} setGameHistory={setGameHistory} />
              {searchFlag && <GameHistory data={gameHistory} />}
            </div>
          }
        </div>
        <div>
          {(gameFlag) && <Game matchID={matchID} isHome={isHome}/>}
        </div>
        <div className={styles.blinking}>
          {(matchFlag && !gameFlag && !inviteFlag) && <h2 className={styles.matchingFont}>matching...</h2>}
        </div>
        <div>
          {(inviteFlag) && <GameFriend user={opponent} isHome={isHome}/>}
        </div>
      </div>
      <div>
        {(!gameFlag && !inviteFlag) && <MatchButton setMatchFlag={setMatchFlag} setGameHistory={setGameHistory} matchFlag={matchFlag}/>}
      </div>
    </div>
  )
}