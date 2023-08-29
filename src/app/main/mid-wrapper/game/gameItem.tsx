"use client";

import React from 'react';
import styles from './gameItem.module.scss'
import Image from 'next/image'
import { io } from 'socket.io-client'
import { useState, useEffect } from 'react';
import { set, useForm } from 'react-hook-form';

let test: number = -1;
interface ballDto {
  width: number;
  height: number;
  x: number;
  y: number;
  type: string;
  // score: number;
}

interface paddleDto {
  width: number;
  height: number;
  x: number;
  y: number;
  type: string;
  score: number;
}

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjExMTEsImVtYWlsIjoiQUFBQUBnbWFpbC5jb20iLCJ0d29GYWN0b3JBdXRoIjpmYWxzZSwiaWF0IjoxNjkzMjgwNzUwLCJleHAiOjE2OTMzMjM5NTB9.CFCThh0SnDqPGNncg9WSYeLBJDprdzWOqFErbmfarHw"
const socket = io("http://localhost:10000/pong", {
  extraHeaders: {
    Authorization: `${TOKEN}`,
  }
})

const options = {
  timeZone: 'Asia/Seoul',
};

interface HookFormTypes {
  id: string;
}

const formatTime = (time: Date) => {
  const date = new Date(time);
  return date.toLocaleString('en-US', options);
}

export default function GameItem(props: {}) {

  return (
    <div>
      <DisplayGame />
    </div>
  )
}

const DisplayGame = (props: {}) => {
  const [matchFlag, setMatchFlag] = useState(false);
  const [searchFlag, setSearchFlag] = useState(false);
  const [matchHistory, setMatchHistory] = useState<any>([]);
  const [gameFlag, setGameFlag] = useState(false);

  useEffect(() => {
    socket.on('pong/game/init', (data: any) => {
      console.log('game init', data);
      setGameFlag(true);
    });

  }, [gameFlag]);

  return (
    <div>
      <div className={styles.gameDisplayBackground}>
        {/* not game, not matching */}
        {
          (!matchFlag && !gameFlag) && 
          <div className={styles.matchHistoryBackground}>
            <DisplayGameSearchBox setSearchFlag={setSearchFlag} setMatchHistory={setMatchHistory}/>
            {searchFlag &&  <MatchHistory matchHistory={matchHistory}/>}
          </div>
        }
        <div>
          {/* game */}
          {gameFlag && <Game setGameFlag={setGameFlag} setMatchFlag={setMatchFlag} gameFlag={gameFlag}/>}
        </div>
        <div className = {styles.blinking}>
          {/* matching */}
          {(matchFlag && !gameFlag) && <h2 className={styles.matchingFont}>matching...</h2>}
        </div>
      </div>
      <div>
        {/* not game  */}
       {!gameFlag && <MatchButton setMatchFlag={setMatchFlag} setMatchHistory={setMatchHistory} matchFlag={matchFlag}/>}
      </div>
    </div>
  )
}



const DisplayGameSearchBox = (
  { 
    setSearchFlag,
    setMatchHistory,
   } : 
   {setSearchFlag:React.Dispatch<React.SetStateAction<boolean>>
    setMatchHistory:React.Dispatch<React.SetStateAction<any[]>>
  },
  ) => {
  const { register, handleSubmit } = useForm<HookFormTypes>();

  const onVaild = async (data: HookFormTypes) => {
    console.log("onVaild", data);
    setSearchFlag(true);
    setMatchHistory([]);
    const res = await fetch(
      `http://localhost:10000/api/pong/${data.id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        }
      }
    )
    const json = await res.json();
    if (json.history === null || json.history.length === 0) {
      console.log("no data");
    } else {
      console.log(json.history);
      const newArray = json.history.slice(0, 4);
      setMatchHistory(newArray);
    }
  }

  const onInvalid = (error: any) => {
    console.log("onInvalid", error);
    setSearchFlag(false);
  }
  
  return (
    <form 
      className={styles.gameSearchContainer}
      onSubmit={handleSubmit(onVaild, onInvalid)}
    >
      <input 
        className={styles.gameSearchBox}
        {...register("id", {required: true})}
        type="text"
        placeholder="Search Username"
      >
      </input>
      <button 
        className={styles.gameSearchIconContainer} 
      >
        <Image
          className={styles.gameSearchIcon}
          src="asset/RecordSearch.svg"
          alt="RecodSearch icon"
          width={40}
          height={40}
        />
      </button>
    </form>
  )
}

const MatchButton = (
  { 
    setMatchFlag,
    setMatchHistory,
    matchFlag
  } :
  {
    setMatchFlag:React.Dispatch<React.SetStateAction<boolean>>
    setMatchHistory:React.Dispatch<React.SetStateAction<any[]>>
    matchFlag: boolean
  }) => {
  const handleStartClick = () => {
    console.log('start clicked')
    setMatchFlag(true);
    setMatchHistory([]);
    socket.emit('pong/ladder/join');
  }

  const handleCancelClick = () => {
    console.log('cancel clicked')
    setMatchFlag(false);
    socket.emit('pong/ladder/cancle')
  }

  return (
    <button className={styles.gameButtonContainer} onClick={matchFlag ? handleCancelClick : handleStartClick}>
      <h2 className={styles.gameButtonFont}>{matchFlag ? "cancle" : "start match"}</h2>
    </button>
  )
}

const MatchHistory = (history : any) => {
  return (
    <ul>
      {history.matchHistory.map((match : any) => (
        <li key = {match.matchInfo_id}>
          <div className={styles.matchHistoryContainer}>
            <div className={styles.matchTypeBox}>
              <h2 className = {styles.matchHistoryFont}>{match.matchInfo_match_type}</h2>
            </div>
            <div className={styles.matchHistoryLeftBox}>
              <h2 className = {styles.matchHistoryFont}>{match.matchInfo_winner_id}</h2>
            </div>
            <div className={styles.matchHistoryCenterBox}>
              <h2 className={styles.matchHistoryFont}>
                {match.matchInfo_winner_score}
                {' '}
                :
                {' '}
                {match.matchInfo_loser_score}
              </h2>
            </div>
            <div className={styles.matchHistoryRightBox}>
              <h2 className = {styles.matchHistoryFont}>{match.matchInfo_loser_id}</h2>
            </div>
          </div>
          <h2 className={styles.matchTimeFont}>{formatTime(match.matchInfo_timestamp)}</h2>

        </li>
      ))}
    </ul>
  )
}

const Game = (
  {
    setGameFlag,
    setMatchFlag,
    gameFlag,
  } :
  {
    setGameFlag:React.Dispatch<React.SetStateAction<boolean>>
    setMatchFlag:React.Dispatch<React.SetStateAction<boolean>>
    gameFlag: boolean
  }
  ) => {
  const [paddleDto, setPaddleDto] = useState<Map<string, paddleDto>>(new Map());
  const [ballDto, setBallDto] = useState<ballDto>({width: 0, height: 0, x: 0, y: 0, type: ''});
  const [isWin, setIsWin] = useState("");
  const [score, setScore] = useState({me: 0, you: 0});
  const [scorePos, setScorePos] = useState({me: 0, you: 0});
  const [gameResult, setGameResult] = useState(false);

  useEffect(() => {
    socket.on('pong/game/ready', ( data : { player1: paddleDto, player2: paddleDto, ball: ballDto }) => 
    {
      console.log('game ready', data);
      // me = data.player1.type;
      // you = data.player2.type;
      
      setPaddleDto((prev) => new Map(prev.set('me', data.player1)));
      setPaddleDto((prev) => new Map(prev.set('you', data.player2)));
      setBallDto(data.ball);
      setScore({me: data.player1.score, you: data.player2.score})
      const myPos : number = data.player1.x < 200 ? data.player1.x + 100 : data.player1.x - 100;
      const yourPos : number = data.player2.x < 200 ? data.player2.x + 100 : data.player2.x - 100;
      setScorePos({me: myPos, you: yourPos});
      });

      socket.on('pong/game/update', ( data : { player1: paddleDto, player2: paddleDto, ball: ballDto }) =>
      {
        // console.log('game update', data);
        setPaddleDto((prev) => new Map(prev.set('me', data.player1)));
        setPaddleDto((prev) => new Map(prev.set('you', data.player2)));
        setBallDto(data.ball);
        setScore({me: data.player1.score, you: data.player2.score})
      });

      socket.on('pong/game/end', ( payload : {winner: boolean, client1_score: number, client2_score: number }) =>
      {
        if (payload.winner) setIsWin("winner");
        else setIsWin("loser");
        // console.log(payload);
        
        setScore({me: payload.client1_score, you: payload.client2_score});
        setGameResult(true);
        // setGameFlag(false);
        // setPaddleDto(new Map());
        // setBallDto({width: 0, height: 0, x: 0, y: 0, type: ''});
      });

    }, [paddleDto, ballDto, isWin, score]);

    useEffect(() => {

    }, []);

    useEffect(() => {
      const handleKeyPress = (e: KeyboardEvent) => {
        const { key } = e;
        if (key === 'a') {
          socket.emit('pong/game/keyEvent', {key: 'up', ident: paddleDto.get('me')?.type});
          console.log(socket.id, 'up');
        } else if (key === 'z') {
          socket.emit('pong/game/keyEvent', {key: 'down', ident: paddleDto.get('me')?.type});
          console.log(socket.id, 'down');
        }
      };
      window.addEventListener('keydown', handleKeyPress);
      return() => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, []);

    const handeleBackClick = () => {
      setGameFlag(false);
      setMatchFlag(false);
      setPaddleDto(new Map());
      setBallDto({width: 0, height: 0, x: 0, y: 0, type: ''});
      setGameResult(false);
      setScore({me: 0, you: 0});
      setScorePos({me: 0, you: 0});
      setIsWin("");
    }
  
  return (
    <div>
        <div style={{
          position: 'absolute',
          backgroundColor: 'white',
          width: paddleDto.get('me')?.width,
          height: paddleDto.get('me')?.height,
          left: paddleDto.get('me')?.x,
          top: paddleDto.get('me')?.y,
        }}>
        </div>
        <div style={{
          position: 'absolute',
          backgroundColor: 'red',
          width: paddleDto.get('you')?.width,
          height: paddleDto.get('you')?.height,
          left: paddleDto.get('you')?.x,
          top: paddleDto.get('you')?.y,
        }}>
        </div>
        <div style={{
          position: 'absolute',
          backgroundColor: 'blue',
          width: ballDto.width,
          height: ballDto.height,
          left: ballDto.x,
          top: ballDto.y,
        }}>
        </div>
        <div style={{
          position: 'absolute',
          left: scorePos.me,
        }}>
          <h2 className={styles.resultFont}>{score.me}</h2>
        </div>
        <div style={{
          position: 'absolute',
          left: scorePos.you,
        }}>
          <h2 className={styles.resultFont}>{score.you}</h2>
        </div>
        {gameResult && 
        <div>
          <div className={styles.blinking}>
            <div className={styles.resultBox}>
              <h2 className={styles.resultFont}>{isWin}</h2>
            </div>
          </div>
          <button className={styles.backButton} onClick={handeleBackClick} >
            <h2 className={styles.backFont}>back</h2>
          </button>
        </div>
        }
    </div>

  )
}

