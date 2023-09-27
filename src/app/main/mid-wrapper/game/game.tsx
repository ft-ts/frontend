"use client";

import React, { useState, useEffect} from "react";
import styles from "./gameItem.module.scss";
import { paddleDto, ballDto } from "./game.interface";
import { socket } from '../../components/CheckAuth'

export default function Game(
  {
    matchID,
    isHome,
  } :
  {
    matchID: string
    isHome: boolean
  }
) {
  const [paddleDto, setPaddleDto] = useState<Map<string, paddleDto>>(new Map());
  const [ballDto, setBallDto] = useState<ballDto>({width: 0, height: 0, x: 0, y: 0, type: ''});
  const [count, setCount] = useState(3);
  const [isWin, setIsWin] = useState("");
  const [score, setScore] = useState({me: 0, you: 0});
  const [scorePos, setScorePos] = useState({me: 0, you: 0});
  const [gameResult, setGameResult] = useState(false);
  const [startFlag, setStartFlag] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (count >= 0) {
        setCount(count - 1);
      } else {
        if (!startFlag){
          socket.emit('pong/game/start', { matchID: matchID });
          setStartFlag(true);
        }
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [count, startFlag]);


  useEffect(() => {
    socket.on('pong/game/start', ( data : { home: paddleDto, away: paddleDto, ball: ballDto }) => 
    {
      let myPos : number = 0;
      let yourPos : number = 0;
      
      if (isHome) {
        setPaddleDto((prev) => new Map(prev.set('me', data.home)));
        setPaddleDto((prev) => new Map(prev.set('you', data.away)));
        myPos = 10;
        yourPos = data.away.x - 100;
      } else {
        setPaddleDto((prev) => new Map(prev.set('me', data.away)));
        setPaddleDto((prev) => new Map(prev.set('you', data.home)));
        myPos = data.away.x - 100;
        yourPos = 10;
      }
      setBallDto(data.ball);
      setScore({me: data.home.score, you: data.away.score})
      setScorePos({me: myPos, you: yourPos});
      });

      socket.on('pong/game/update', ( data : { home: paddleDto, away: paddleDto, ball: ballDto }) =>
      {
        console.log('update');
        if (isHome) {
          setPaddleDto((prev) => new Map(prev.set('me', data.home)));
          setPaddleDto((prev) => new Map(prev.set('you', data.away)));
          setScore({me: data.home.score, you: data.away.score})
        } else {
          setPaddleDto((prev) => new Map(prev.set('me', data.away)));
          setPaddleDto((prev) => new Map(prev.set('you', data.home)));
          setScore({me: data.away.score, you: data.home.score})
        }
        setBallDto(data.ball);
      });

      socket.on('pong/game/end', ( payload : {is_win: boolean, home_score: number, away_score: number }) =>
      {
        console.log('end');
        if (payload.is_win) setIsWin("YOU WIN");
        else setIsWin("YOU LOSE");
        
        if (isHome) setScore({me: payload.home_score, you: payload.away_score});
        else setScore({me: payload.away_score, you: payload.home_score});
        setPaddleDto(new Map());
        setBallDto({width: 0, height: 0, x: 0, y: 0, type: ''});
        setGameResult(true);
      });
      return () => {
        socket.off('pong/game/start');
        socket.off('pong/game/update');
        socket.off('pong/game/end');
      }
    }, [paddleDto, ballDto, isWin, score]);

    useEffect(() => {
      const handleKeyPress = (e: KeyboardEvent) => {
        const { key } = e;
        if (key === 'a' || key === 'A' || key === 'ㅁ') {
          socket.emit('pong/game/keyEvent', {key: 'UP', matchID: matchID});
        } else if (key === 'z' || key === 'Z' || key === 'ㅋ') {
          socket.emit('pong/game/keyEvent', {key: 'DOWN', matchID: matchID});
        }
      };
      window.addEventListener('keydown', handleKeyPress);
      return() => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, []);

    const handeleBackClick = () => {
      setPaddleDto(new Map());
      setBallDto({width: 0, height: 0, x: 0, y: 0, type: ''});
      setGameResult(false);
      setScore({me: 0, you: 0});
      setScorePos({me: 0, you: 0});
      setIsWin("");
      setCount(3);
      setStartFlag(false);
      socket.emit('pong/init');
    }

    return (
      <div>
        {(count > 0 && !startFlag) && <div className={styles.countBox}>
          <h2 className={styles.countFont}>{count}</h2>
        </div>}
        {(count <= 0 && !startFlag) && <div className={styles.countBox}>
          <h2 className={styles.countFont}>Start</h2>
        </div>}
        {startFlag && <div>
          <div style={{
            position: 'absolute',
            backgroundColor: 'blue',
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
            backgroundColor: 'white',
            width: ballDto.width,
            height: ballDto.height,
            left: ballDto.x,
            top: ballDto.y,
          }}>
          </div>
          <div style={{
            position: 'absolute',
            left: scorePos.me,
            top: 0,
          }}>
            <h2 className={styles.resultFont}>You : {score.me}</h2>
          </div>
          <div style={{
            position: 'absolute',
            left: scorePos.you - 20,
            top: 0,
          }}>
            <h2 className={styles.resultFont}>Away : {score.you}</h2>
          </div>
        </div>}
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
